import { Contact } from "@/components/Contact";
import { Projects } from "@/components/Projects";
import { Stacks } from "@/components/Stacks";
import { Theatre } from "@/components/Theatre";

export default function Home() {
  return (
    <>
      <Theatre />
      <Stacks />
      <Projects />
      <Contact />
    </>
    // <div className="flex flex-col flex-1 bg-surface selection:bg-primary/30">
    //   {/* Navigation */}
    //   <nav className="fixed top-0 left-0 right-0 z-50 glass h-20 px-8 flex items-center justify-between">
    //     <div className="headline-lg tracking-tighter">PORTFOLIO</div>
    //     <div className="flex gap-8 label-md text-on-surface-variant font-medium">
    //       <a href="#work" className="hover:text-primary transition-colors">Work</a>
    //       <a href="#about" className="hover:text-primary transition-colors">About</a>
    //       <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
    //     </div>
    //   </nav>

    //   <main className="flex-1">

    //     {/* Project Section */}
    //     <section id="work" className="py-20 px-16 bg-surface-container-low">
    //       <div className="flex justify-between items-end mb-16">
    //         <h2 className="headline-lg text-on-background">Selected Works</h2>
    //         <div className="label-md text-on-surface-variant">2024 - 2026</div>
    //       </div>

    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
    //         {[1, 2].map((i) => (
    //           <div key={i} className="group flex flex-col gap-6 p-8 bg-surface-container rounded-2xl transition-all duration-500 hover:bg-surface-bright hover:scale-[1.02] cursor-pointer">
    //             <div className="aspect-video bg-surface-variant rounded-lg overflow-hidden relative">
    //                <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-transparent group-hover:opacity-100 transition-opacity opacity-0" />
    //             </div>
    //             <div className="flex flex-col gap-2">
    //               <div className="label-md text-primary flex gap-3">
    //                 <span>NEXT.JS</span>
    //                 <span>•</span>
    //                 <span>WEBGL</span>
    //               </div>
    //               <h3 className="headline-lg text-2xl group-hover:text-primary transition-colors">PROJECT LUMINARY {i}</h3>
    //               <p className="body-lg text-on-surface-variant line-clamp-2">
    //                 A high-performance technical terminal viewed through a premium lens.
    //               </p>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </section>
    //   </main>

    //   <footer className="py-20 px-16 border-t border-outline-variant/15 flex flex-col md:flex-row justify-between items-center gap-8">
    //     <div className="label-md text-on-surface-variant/70">
    //       © 2026 DIGITAL LUMINARY. ALL RIGHTS RESERVED.
    //     </div>
    //     <div className="flex gap-8 label-md text-on-surface-variant">
    //       <a href="#" className="hover:text-primary transition-colors">GITHUB</a>
    //       <a href="#" className="hover:text-primary transition-colors">LINKEDIN</a>
    //       <a href="#" className="hover:text-primary transition-colors">TWITTER</a>
    //     </div>
    //   </footer>
    // </div>
  );
}
