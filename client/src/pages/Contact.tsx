import { useState } from "react";
import SubpageLayout from "@/components/SubpageLayout";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Form submitted:", values);
    setIsSubmitting(false);
    setIsSuccess(true);
    form.reset();
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  return (
    <SubpageLayout 
      eyebrow="Correspondence" 
      title={<>Initiate<br /><em>Dialogue.</em></>} 
      intro="For professional inquiries, policy discussions, or official communication regarding public administration and quality assurance." 
    >
      <section className="py-12 md:py-24">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Left Column - Contact Info & Form */}
          <motion.div variants={fadeUp} className="lg:col-span-7 space-y-12">
            
            <div className="bg-white border border-[#e5e5e5] p-8 md:p-10 shadow-sm relative overflow-hidden">
              <h3 className="font-serif text-2xl text-[#1a1a1a] mb-6">Send a Message</h3>
              
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#f5f5f5] border border-[#e5e5e5] p-6 flex flex-col items-center justify-center text-center min-h-[300px]"
                >
                  <div className="w-12 h-12 bg-white border border-[#1a1a1a] flex items-center justify-center text-[#1a1a1a] mb-4">
                    <Send size={20} />
                  </div>
                  <h4 className="font-serif text-xl text-[#1a1a1a] mb-2">Message Received</h4>
                  <p className="text-sm text-[#444]">
                    Thank you for reaching out. Your message has been routed appropriately and I will respond as soon as possible.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-6 text-[10px] uppercase tracking-widest font-bold text-[#666] hover:text-[#1a1a1a] transition-colors border-b border-[#e5e5e5] hover:border-[#1a1a1a] pb-1"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-[#666]">Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Jane Doe" 
                                {...field} 
                                className="border-[#e5e5e5] bg-[#fdfcf8] focus-visible:ring-[#1a1a1a] focus-visible:border-[#1a1a1a]"
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-[#666]">Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="jane@example.com" 
                                type="email"
                                {...field} 
                                className="border-[#e5e5e5] bg-[#fdfcf8] focus-visible:ring-[#1a1a1a] focus-visible:border-[#1a1a1a]"
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-[#666]">Subject</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Regarding Public Administration Policy..." 
                              {...field} 
                              className="border-[#e5e5e5] bg-[#fdfcf8] focus-visible:ring-[#1a1a1a] focus-visible:border-[#1a1a1a]"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] uppercase tracking-widest font-bold text-[#666]">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message details here..." 
                              className="min-h-[150px] resize-y border-[#e5e5e5] bg-[#fdfcf8] focus-visible:ring-[#1a1a1a] focus-visible:border-[#1a1a1a]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-[#1a1a1a] text-white px-8 py-4 text-[11px] uppercase tracking-widest font-bold hover:bg-[#333] transition-colors group flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>
                          Transmit Message <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                </Form>
              )}
            </div>
          </motion.div>

          {/* Right Column - Direct Contact & Map */}
          <motion.div variants={fadeUp} className="lg:col-span-5 space-y-8">
            <div className="bg-[#f5f5f5] border border-[#e5e5e5] p-8 shadow-sm hover:shadow-xl hover:border-[#1a1a1a] transition-all duration-300">
              <h3 className="text-[11px] uppercase tracking-widest font-bold text-[#666] mb-6 border-b border-[#e5e5e5] pb-4">
                Direct Contact
              </h3>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4 group">
                  <div className="w-8 h-8 bg-white border border-[#e5e5e5] flex items-center justify-center text-[#1a1a1a] shrink-0 group-hover:border-[#1a1a1a] group-hover:scale-110 transition-all">
                    <Mail size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-[#666] mb-1">Email</p>
                    <a href="mailto:ishratbipasha25@gmail.com" className="text-[#1a1a1a] font-serif hover:text-[#2d7a5d] transition-colors">
                      ishratbipasha25@gmail.com
                    </a>
                  </div>
                </li>
                
                <li className="flex items-start gap-4 group">
                  <div className="w-8 h-8 bg-white border border-[#e5e5e5] flex items-center justify-center text-[#1a1a1a] shrink-0 group-hover:border-[#1a1a1a] group-hover:scale-110 transition-all">
                    <Phone size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-[#666] mb-1">Phone</p>
                    <a href="tel:+8801712592469" className="text-[#1a1a1a] font-serif hover:text-[#2d7a5d] transition-colors">
                      01712-592469
                    </a>
                  </div>
                </li>
                
                <li className="flex items-start gap-4 group">
                  <div className="w-8 h-8 bg-white border border-[#e5e5e5] flex items-center justify-center text-[#1a1a1a] shrink-0 group-hover:border-[#1a1a1a] group-hover:scale-110 transition-all">
                    <MapPin size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-[#666] mb-1">Location</p>
                    <p className="text-[#1a1a1a] font-serif mb-1">
                      Upazila Controller Of Food<br />
                      Gangni, Meherpur<br />
                      Bangladesh
                    </p>
                    <a href="https://maps.google.com/?q=Gangni,Meherpur,Bangladesh" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-widest font-bold text-[#1a1a1a] flex items-center gap-1 hover:text-[#2d7a5d] transition-colors mt-2">
                      View on Map <ExternalLink size={10} />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white border border-[#e5e5e5] p-8 shadow-sm hover:shadow-xl hover:border-[#1a1a1a] transition-all duration-300">
              <h3 className="text-[11px] uppercase tracking-widest font-bold text-[#666] mb-4">
                Professional Network
              </h3>
              <p className="text-sm text-[#444] mb-6 leading-relaxed">
                Available for consultations on food safety frameworks, public administration, and strategic policy implementation.
              </p>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-[#1a1a1a] border border-[#1a1a1a] px-6 py-3 text-[11px] uppercase tracking-widest font-bold hover:bg-[#1a1a1a] hover:text-white transition-all shadow-sm">
                Connect on LinkedIn <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </SubpageLayout>
  );
}
