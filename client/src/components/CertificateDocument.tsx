import React, { useState } from "react";
import { CheckCircle2, ZoomIn, ShieldCheck, Landmark, Globe2, FileCheck2, Trophy } from "lucide-react";
import type { CertificateRecord } from "@/data/certificates";

interface Props {
  record: CertificateRecord;
  scanUrl?: string | null;
  isEnlarged?: boolean;
}

/**
 * Displays a certificate's scanned image, or a photographed award/plaque,
 * when available at `record.defaultImage` (a static file bundled with the
 * site under /client/public/certificates/). If the image is missing or fails
 * to load, it falls back to a clean "dossier" summary card instead of a
 * broken image icon.
 */
export default function CertificateDocument({ record, scanUrl, isEnlarged = false }: Props) {
  const [imgError, setImgError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const displayScan = scanUrl || record.defaultImage;
  const isAward = record.mediaType === "award";

  // Real scanned certificate / photographed award image
  if (displayScan && !imgError) {
    return (
      <div
        className={`relative w-full h-full flex flex-col items-center justify-center bg-[#fdfcf8] overflow-hidden ${
          isEnlarged ? "min-h-[460px] p-2" : "min-h-[170px]"
        }`}
      >
        <div
          className={`relative w-full h-full flex items-center justify-center cursor-pointer select-none ${
            isZoomed ? "overflow-auto p-4" : "p-2"
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
          title={isZoomed ? "Click to reset zoom" : `Click to zoom ${isAward ? "photograph" : "certificate"}`}
        >
          <img
            src={displayScan}
            alt={`${isAward ? "Photograph of award" : "Scanned certificate"}: ${record.title}`}
            className={`max-w-full max-h-full object-contain transition-transform duration-300 ${
              isZoomed ? "scale-150 shadow-lg" : "scale-100 drop-shadow-sm"
            }`}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        </div>

        {/* Verification Strip */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-4 py-2 rounded-lg bg-white/95 backdrop-blur-sm text-[11px] text-[#1a1a1a] border border-[#e5e5e5] shadow-md pointer-events-none">
          <div className="flex items-center gap-2 truncate">
            <CheckCircle2 size={16} className="text-[#2d7a5d] shrink-0" />
            <span className="font-semibold tracking-widest uppercase text-[10px] truncate">
              {isAward ? "Verified Record" : "Verified Scan"}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0 pointer-events-auto">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(!isZoomed);
              }}
              className="px-3 py-1.5 rounded bg-[#f5f5f5] hover:bg-[#e5e5e5] text-[#1a1a1a] font-semibold text-[10px] uppercase tracking-widest flex items-center gap-1.5 transition-colors"
            >
              <ZoomIn size={14} />
              <span>{isZoomed ? "100%" : "Zoom"}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fallback dossier view if no scan is present yet, or the image failed to load
  return (
    <div
      className={`relative w-full h-full flex flex-col justify-between select-none bg-white ${
        isEnlarged ? "p-8 min-h-[460px]" : "p-6 min-h-[170px]"
      }`}
    >
      {/* Top Header of Record */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#e5e5e5]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#fdfcf8] border border-[#e5e5e5] flex items-center justify-center text-[#1a1a1a] shrink-0">
            {record.filterGroup === "academic" ? (
              <Landmark size={16} />
            ) : record.filterGroup === "training" ? (
              <Globe2 size={16} />
            ) : record.filterGroup === "recognition" ? (
              <Trophy size={16} />
            ) : (
              <ShieldCheck size={16} />
            )}
          </div>
          <div className="min-w-0">
            <span className="block text-[10px] uppercase tracking-widest text-[#1a1a1a] font-bold truncate">
              Record {record.code}
            </span>
            <span className="text-[10px] text-[#666] tracking-widest uppercase truncate block">
              {record.category}
            </span>
          </div>
        </div>
        <span className="px-3 py-1 rounded bg-[#f5f5f5] text-[10px] font-bold text-[#1a1a1a] shrink-0">
          {record.year}
        </span>
      </div>

      {/* Middle: Certificate Title & Original File Details */}
      <div className={`my-auto ${isEnlarged ? "py-6 space-y-4" : "py-4 space-y-2"}`}>
        <h3
          className={`font-serif font-bold text-[#1a1a1a] leading-tight ${
            isEnlarged ? "text-2xl" : "text-lg line-clamp-2"
          }`}
        >
          {record.title}
        </h3>
        <div className="text-[11px] text-[#666] line-clamp-1 uppercase tracking-widest">
          <span className="font-semibold text-[#1a1a1a]">Issuer: </span>
          <span>{record.issuer}</span>
        </div>

        {/* Source Document Information */}
        <div className="p-4 rounded-lg bg-[#fdfcf8] border border-[#e5e5e5] space-y-2 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#1a1a1a] uppercase tracking-widest">
              {isAward ? "Source Photograph" : "Source Document"}
            </span>
            <span className="text-[#9a7d1f] text-[10px] font-bold uppercase tracking-widest">
              {isAward ? "Photo Pending" : "Scan Pending"}
            </span>
          </div>
          <div className="text-[11px] text-[#666] font-mono truncate">
            {record.originalFilename}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-[#e5e5e5] flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold text-[#666]">
        <FileCheck2 size={16} className="text-[#1a1a1a]" />
        <span>Verified Dossier</span>
      </div>
    </div>
  );
}
