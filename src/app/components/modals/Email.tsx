"use client";

import { useState } from "react";
import Modal from "react-modal";
import emailjs from "emailjs-com";
import toast from 'react-hot-toast';

export default function EmailModal({
  closeEmailModal,
  swatData,
  customData,
}: {
  closeEmailModal: () => void;
  swatData: {
    selectedRole: {
      roles: string;
    };
    selectedSeniority: {
      seniority_level: string;
    };
    workload: number;
    durationDiscount: number;
    finalRate: number;
    currency: string;
  };
  customData: {
    selectedRole: {
      roles: string;
    };
    selectedSeniority: {
      seniority_level: string;
    };
    selectedRegion: {
      name: string;
    };
    finalRate: number;
    currency: string;
  };
}) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    const templateParams = {
      to_email: email,

      // SWAT Calculator Values
      swat_currency: swatData.currency,
      swat_role: swatData.selectedRole?.roles,
      swat_seniority: swatData.selectedSeniority.seniority_level,
      swat_workload: `${Number(swatData.workload) * 100}%`,
      swat_duration_discount: `${swatData.durationDiscount}`,
      swat_final_rate: swatData.finalRate.toFixed(2),

      // Custom Calculator Values
      custom_currency: customData.currency,
      custom_region: customData.selectedRegion.name,
      custom_role: customData.selectedRole.roles,
      custom_seniority: customData.selectedSeniority.seniority_level,
      custom_final_rate: customData.finalRate.toFixed(2),
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(
        (response) => {
          toast.success("Rate sent to your email!");
          setIsLoading(false);
          closeEmailModal();
        },
        (error) => {
          toast.error("Failed to send email. Please try again.");
          console.error("Error sending email:", error);
          setIsLoading(false);
        }
      );
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={true}
      onRequestClose={closeEmailModal}
      contentLabel="Send Rate"
      className="bg-modal p-6 rounded-md shadow-lg max-w-md w-full bg-opacity-100"
    >
      <h2 className="text-xl text-gray-700 dark:text-zinc-300 font-semibold mb-4">
        Enter your email to receive the rate
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="johndoe@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-button rounded-md mb-4 text-black dark:text-white"
          required
        />
        <div className="flex justify-end gap-3">
          <button
            type="submit"
            className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Email"}
          </button>
          <button
            type="button"
            onClick={closeEmailModal}
            disabled={isLoading}
            className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
