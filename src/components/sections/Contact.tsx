import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { EarthCanvas } from "../canvas";
import { SectionWrapper } from "../../hoc";
import { slideIn } from "../../utils/motion";
import { config } from "../../constants/config";

const INITIAL_STATE = Object.fromEntries(
  Object.keys(config.contact.form).map((input) => [input, ""])
);

const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  accessToken: import.meta.env.VITE_EMAILJS_ACCESS_TOKEN,
};

const Contact = () => {
  const formRef = useRef<React.LegacyRef<HTMLFormElement> | undefined>();
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    if (e === undefined) return;
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement> | undefined) => {
    if (e === undefined) return;
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          form_name: form.name,
          to_name: config.html.fullName,
          from_email: form.email,
          to_email: config.html.email,
          message: form.message,
        },
        emailjsConfig.accessToken
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");
          setForm(INITIAL_STATE);
        },
        (error) => {
          setLoading(false);
          console.log(error);
          alert("Something went wrong.");
        }
      );
  };

  return (
    <div className={`flex flex-col-reverse gap-8 sm:gap-10 overflow-hidden xl:mt-12 xl:flex-row`}>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75]"
      >
        {/* Terminal-style form */}
        <div className="rounded-xl border border-white/[0.06] bg-[#0d1117]/60 backdrop-blur-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22]/80 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="ml-2 text-[11px] text-gray-500 font-mono">contact.tsx</span>
          </div>

          <div className="p-5 sm:p-7">
            <div className="mb-6">
              <span className="font-mono text-xs text-[#915EFF]/60 tracking-widest uppercase">{'// get in touch'}</span>
              <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
                Contact<span className="text-[#915EFF]">.</span>
              </h3>
            </div>

            <form
              // @ts-expect-error
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              {Object.keys(config.contact.form).map((input) => {
                const { span, placeholder } =
                  config.contact.form[input as keyof typeof config.contact.form];
                const Component = input === "message" ? "textarea" : "input";

                return (
                  <label key={input} className="flex flex-col">
                    <span className="mb-2 text-sm font-medium text-gray-300">{span}</span>
                    <Component
                      type={input === "email" ? "email" : "text"}
                      name={input}
                      value={form[`${input}`]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className="bg-[#0d1117] placeholder:text-gray-600 rounded-lg border border-white/8 px-4 py-3 text-sm font-mono text-white outline-none focus:border-[#915EFF]/40 focus:shadow-[0_0_12px_rgba(145,94,255,0.1)] transition-all duration-300"
                      {...(input === "message" && { rows: 5 })}
                    />
                  </label>
                );
              })}
              <button
                type="submit"
                className="group relative overflow-hidden w-fit rounded-lg px-7 py-3 font-semibold text-sm mt-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#915EFF] to-[#00bfff] transition-all duration-300 group-hover:opacity-90" />
                <span className="relative z-10 text-white">
                  {loading ? "Sending..." : "Send Message →"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="h-[280px] sm:h-[350px] md:h-[550px] xl:h-auto xl:flex-1"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
