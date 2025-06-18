import React from "react";
import { Mail, Linkedin, Github, ExternalLink } from "lucide-react";

function Contact() {
    return (
        <div className="p-3 flex flex-col sm:mx-16 mt-16 mx-8 min-h-screen">
            <h1 className="text-5xl sm:text-7xl font-bold pb-8 text-gray-900 ">Contact</h1>
            
            <div className="flex flex-col gap-6 text-lg text-white">
                <a 
                    href="https://linkedin.com/in/sohil-lochan" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-cyan-700 hover:underline"
                >
                    <Linkedin className="w-5 h-5" /> LinkedIn
                </a>

                <a 
                    href="https://sohil-magixz.github.io/my-portfolio/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-cyan-700 hover:underline"
                >
                    <ExternalLink className="w-5 h-5" /> Portfolio
                </a>

                <a 
                    href="mailto:sohiltoryt@gmail.com" 
                    className="flex items-center gap-2 text-cyan-700 hover:underline"
                >
                    <Mail className="w-5 h-5" /> Mail me
                </a>

                <a 
                    href="https://github.com/Sohil-Magixz" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-cyan-700 hover:underline"
                >
                    <Github className="w-5 h-5" /> GitHub
                </a>
            </div>
        </div>
    );
}

export default Contact;
