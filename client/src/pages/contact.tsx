import { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  XCircle,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setFormStatus("success");
      form.reset();
      toast({
        title: "Message sent successfully",
        description: "Thank you for reaching out. I'll get back to you soon!",
        variant: "success",
      });
    },
    onError: (error) => {
      setFormStatus("error");
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    setFormStatus("idle");
    contactMutation.mutate(data);
  };

  return (
    <>
      <Helmet>
        <title>Contact | Jokoris</title>
        <meta name="description" content="Hubungi Jokoris. Kirim pesan, ajukan pertanyaan, atau sekadar menyapa!" />
      </Helmet>
      
      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 dark:text-white mb-4">
              Hubungi <span className="bg-gradient-text">Kami</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Punya pertanyaan, masukan, atau sekadar ingin menyapa? Saya senang mendengar dari Anda!
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div 
              className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Send a Message
              </h2>
              
              {formStatus === "success" ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 flex flex-col items-center text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 dark:text-green-400 mb-4" />
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-green-700 dark:text-green-400 mb-4">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setFormStatus("idle")}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="What is this regarding?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Your message..." 
                              className="min-h-[150px]" 
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                    
                    {formStatus === "error" && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start">
                        <XCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-3 mt-0.5 shrink-0" />
                        <div>
                          <h4 className="text-sm font-semibold text-red-800 dark:text-red-300">
                            There was an error sending your message
                          </h4>
                          <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                            Please try again or contact me directly at joko@jokoris.com.
                          </p>
                        </div>
                      </div>
                    )}
                  </form>
                </Form>
              )}
            </motion.div>
            
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-6 md:p-8 mb-8">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                  Contact Information
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-white dark:bg-slate-800 rounded-full p-3 mr-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                        Email
                      </h3>
                      <a 
                        href="mailto:joko@jokoris.com" 
                        className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors duration-150"
                      >
                        joko@jokoris.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white dark:bg-slate-800 rounded-full p-3 mr-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                        Phone
                      </h3>
                      <a 
                        href="tel:+1234567890" 
                        className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors duration-150"
                      >
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white dark:bg-slate-800 rounded-full p-3 mr-4">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                        Location
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        Jakarta, Indonesia
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 md:p-8">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                  Connect on Social Media
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="https://twitter.com/jokoris" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
                  >
                    <svg className="h-6 w-6 text-[#1DA1F2] mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                    <span className="text-slate-900 dark:text-white font-medium">Twitter</span>
                  </a>
                  
                  <a 
                    href="https://linkedin.com/in/jokoris" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
                  >
                    <svg className="h-6 w-6 text-[#0A66C2] mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span className="text-slate-900 dark:text-white font-medium">LinkedIn</span>
                  </a>
                  
                  <a 
                    href="https://facebook.com/jokoris" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
                  >
                    <svg className="h-6 w-6 text-[#1877F2] mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-900 dark:text-white font-medium">Facebook</span>
                  </a>
                  
                  <a 
                    href="https://instagram.com/jokoris" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
                  >
                    <svg className="h-6 w-6 text-[#E4405F] mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-900 dark:text-white font-medium">Instagram</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* FAQ Section */}
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                  How quickly do you respond to messages?
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  I typically respond to messages within 24-48 hours during business days. For urgent inquiries, please mention the urgency in the subject line.
                </p>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                  Do you accept guest posts?
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Yes, I do accept high-quality guest posts that align with the blog's topics. Please reach out with your pitch and some samples of your previous work.
                </p>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                  Are you available for speaking engagements?
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Yes, I'm available for speaking at events related to digital marketing, content creation, and personal development. Please get in touch with details about your event.
                </p>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                  How can I stay updated with your latest content?
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  The best way to stay updated is to subscribe to my newsletter. You'll receive new posts directly in your inbox, along with exclusive content not published on the blog.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default Contact;
