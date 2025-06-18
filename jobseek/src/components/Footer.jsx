import React from "react";
import { Linkedin, Github, Twitter, Mail } from "lucide-react";

function Footer() {
    return (
        <footer className="w-full bg-cyan-800 text-white py-6 px-4 mt-12">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between gap-6 sm:gap-0">

                <div className="hidden sm:flex flex-col gap-2">
                    <h2 className="font-bold text-lg">Job Seek © 2025</h2>
                    <p className="text-sm">Your gateway to the best career opportunities.</p>
                    <p className="text-sm">📍 Chennai, India</p>
                </div>

                <div className="hidden sm:flex flex-col gap-1 text-sm">
                    <h3 className="font-semibold mb-1">Quick Links</h3>
                    <a href="/" className="hover:text-cyan-300">Home</a>
                    <a href="/about" className="hover:text-cyan-300">About</a>
                    <a href="/contact" className="hover:text-cyan-300">Contact</a>
                </div>

                <div className="hidden sm:flex flex-col gap-1 text-sm">
                    <h3 className="font-semibold mb-1">Follow Us</h3>
                    <a href="https://linkedin.com/in/sohil-lochan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-cyan-300">
                        <Linkedin size={16} /> LinkedIn
                    </a>
                    <a href="https://github.com/Sohil-Magixz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-cyan-300">
                        <Github size={16} /> GitHub
                    </a>
                    <a href="#" className="flex items-center gap-1 hover:text-cyan-300">
                        <Twitter size={16} /> Twitter
                    </a>
                </div>

                <div className="flex flex-col gap-1 text-sm">
                    <h3 className="font-semibold mb-1">Contact</h3>
                    <a href="mailto:support@jobseek.com" className="flex items-center gap-1 hover:text-cyan-300">
                        <Mail size={16} /> sohiltoryt@gmail.com
                    </a>
                    <p className="text-xs mt-2">Made with ❤️ by <a className="text-cyan-300 underline" href="https://linkedin.com/in/sohil-lochan" target="_blank">Sohil Lochan</a></p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
