import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { requireAuth, type AuthRequest } from "./src/middleware/auth.ts";
import { getOrCreateUser, getUsers } from "./src/db/users.ts";
import { createInquiry, getInquiries } from "./src/db/inquiries.ts";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "25mb" }));

  // API routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "Ishrat Zahan Portfolio API" });
  });

  // Serve uploaded media
  const storageDir = path.join(process.cwd(), "client/public/storage");
  app.use("/storage", express.static(storageDir));
  app.use("/manus-storage", express.static(storageDir));

  // Get current portrait status
  app.get("/api/portrait", (_req, res) => {
    const targetFile = path.join(process.cwd(), "client/public/storage/portrait.jpg");
    if (fs.existsSync(targetFile)) {
      const stats = fs.statSync(targetFile);
      res.json({ exists: true, url: `/storage/portrait.jpg?t=${stats.mtimeMs}` });
    } else {
      res.json({ exists: false, url: "/storage/portrait.jpg" });
    }
  });

  // Upload custom portrait to disk (replaces AI placeholder with user's real photo)
  app.post("/api/upload-portrait", async (req, res) => {
    try {
      const { imageBase64 } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: "Missing imageBase64 data" });
      }
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(cleanBase64, "base64");

      const destDir = path.join(process.cwd(), "client/public/storage");
      await fs.promises.mkdir(destDir, { recursive: true });
      const targetFile = path.join(destDir, "portrait.jpg");
      await fs.promises.writeFile(targetFile, buffer);

      // Also copy to root public path and dist paths if existing
      const publicRoot = path.join(process.cwd(), "client/public/ishrat-zahan-portrait.jpg");
      await fs.promises.writeFile(publicRoot, buffer).catch(() => {});

      const distDir = path.join(process.cwd(), "dist/storage");
      if (fs.existsSync(path.join(process.cwd(), "dist"))) {
        await fs.promises.mkdir(distDir, { recursive: true });
        await fs.promises.writeFile(path.join(distDir, "portrait.jpg"), buffer).catch(() => {});
        await fs.promises.writeFile(path.join(process.cwd(), "dist/ishrat-zahan-portrait.jpg"), buffer).catch(() => {});
      }

      res.json({ success: true, url: `/storage/portrait.jpg?t=${Date.now()}` });
    } catch (error: any) {
      console.error("Failed to save portrait:", error);
      res.status(500).json({ error: error.message || "Failed to save portrait" });
    }
  });

  // Upload official certificate scan to disk
  app.post("/api/upload-certificate", async (req, res) => {
    try {
      const { id, imageBase64 } = req.body;
      if (!id || !imageBase64) {
        return res.status(400).json({ error: "Missing id or imageBase64 data" });
      }
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(cleanBase64, "base64");

      const safeId = String(id).replace(/[^a-zA-Z0-9_-]/g, "_");
      const destDir = path.join(process.cwd(), "client/public/storage/certificates");
      await fs.promises.mkdir(destDir, { recursive: true });
      const targetFile = path.join(destDir, `${safeId}.jpg`);
      await fs.promises.writeFile(targetFile, buffer);

      const distDir = path.join(process.cwd(), "dist/storage/certificates");
      if (fs.existsSync(path.join(process.cwd(), "dist"))) {
        await fs.promises.mkdir(distDir, { recursive: true });
        await fs.promises.writeFile(path.join(distDir, `${safeId}.jpg`), buffer);
      }

      res.json({ success: true, url: `/storage/certificates/${safeId}.jpg?t=${Date.now()}` });
    } catch (error: any) {
      console.error("Failed to save certificate:", error);
      res.status(500).json({ error: error.message || "Failed to save certificate" });
    }
  });

  // Get all saved certificate image URLs from disk
  app.get("/api/certificates", async (_req, res) => {
    try {
      const certificates: Record<string, string> = {};
      
      const storageDir = path.join(process.cwd(), "client/public/storage/certificates");
      if (fs.existsSync(storageDir)) {
        const files = await fs.promises.readdir(storageDir);
        for (const file of files) {
          if (file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".jpeg")) {
            const id = path.parse(file).name;
            certificates[id] = `/storage/certificates/${file}`;
          }
        }
      }

      const attachedAssetsDir = path.join(process.cwd(), "client/public/attached_assets");
      if (fs.existsSync(attachedAssetsDir)) {
        const attachedFiles = await fs.promises.readdir(attachedAssetsDir);
        for (const file of attachedFiles) {
          if (file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".jpeg")) {
            // Find the matching certificate ID based on the original filename from certificates.ts
            // But since the frontend uses defaultImage directly, we don't strictly need this.
            // Just exposing it for completeness of the backend logic requested.
            const id = path.parse(file).name;
            certificates[id] = `/attached_assets/${file}`;
          }
        }
      }

      res.json({ certificates });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to list certificates" });
    }
  });

  // Contact / Advisory inquiry endpoint (Cloud SQL persistence)
  app.post("/api/inquiries", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const saved = await createInquiry({
        name: String(name).trim().slice(0, 100),
        email: String(email).trim().slice(0, 150),
        subject: String(subject).trim().slice(0, 200),
        message: String(message).trim().slice(0, 2000),
      });

      res.status(201).json({ success: true, inquiry: saved });
    } catch (error: any) {
      console.error("Failed to submit inquiry to Cloud SQL:", error);
      res.status(500).json({ error: error.message || "Failed to process inquiry" });
    }
  });

  // Authenticated route: Get inquiries from Cloud SQL
  app.get("/api/inquiries", requireAuth, async (_req: AuthRequest, res) => {
    try {
      const list = await getInquiries();
      res.json({ inquiries: list });
    } catch (error: any) {
      console.error("Failed to fetch inquiries:", error);
      res.status(500).json({ error: error.message || "Failed to fetch inquiries" });
    }
  });

  // Authenticated route: Synchronize logged-in user with Cloud SQL
  app.post("/api/users/sync", requireAuth, async (req: AuthRequest, res) => {
    try {
      if (!req.user?.uid) {
        return res.status(401).json({ error: "Invalid user token" });
      }
      const user = await getOrCreateUser(req.user.uid, req.user.email || "anonymous");
      res.json({ success: true, user });
    } catch (error: any) {
      console.error("Failed to sync user:", error);
      res.status(500).json({ error: error.message || "Failed to sync user" });
    }
  });

  // Authenticated route: Get users list from Cloud SQL
  app.get("/api/users", requireAuth, async (_req: AuthRequest, res) => {
    try {
      const list = await getUsers();
      res.json({ users: list });
    } catch (error: any) {
      console.error("Failed to fetch users:", error);
      res.status(500).json({ error: error.message || "Failed to fetch users" });
    }
  });

  // Vite middleware for development / Static file serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Only listen if not running on Vercel (Vercel uses the exported app)
  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
  
  return app;
}

const appPromise = startServer();
export default async function (req: any, res: any) {
  const app = await appPromise;
  return app(req, res);
}
