import { useState, useEffect } from "react";
import type { ILead } from "../types";
import { X } from "lucide-react";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<ILead>) => Promise<void>;
  initialData?: ILead | null;
}

export default function LeadModal({ isOpen, onClose, onSubmit, initialData }: LeadModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<ILead["status"]>("New");
  const [source, setSource] = useState<ILead["source"]>("Website");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setStatus(initialData.status);
      setSource(initialData.source);
    } else {
      setName("");
      setEmail("");
      setStatus("New");
      setSource("Website");
    }
    setError("");
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onSubmit({ name, email, status, source });
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to save lead.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, backgroundColor: "rgba(107, 114, 128, 0.6)" }}
      />

      {/* Modal Box */}
      <div
        style={{
          position: "relative",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          padding: "24px",
          width: "100%",
          maxWidth: "500px",
          margin: "16px",
          zIndex: 1,
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{ position: "absolute", top: "12px", right: "12px", background: "none", border: "none", cursor: "pointer", color: "#6b7280" }}
        >
          <X size={20} />
        </button>

        <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "20px", color: "#111827" }}>
          {initialData ? "Edit Lead" : "Add New Lead"}
        </h2>

        {error && (
          <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "8px 12px", borderRadius: "6px", marginBottom: "16px", fontSize: "14px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
              placeholder="Full Name"
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
              placeholder="email@example.com"
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ILead["status"])}
              style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "6px" }}>
              Source
            </label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value as ILead["source"])}
              style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", outline: "none", boxSizing: "border-box" }}
            >
              <option value="Website">Website</option>
              <option value="Instagram">Instagram</option>
              <option value="Referral">Referral</option>
            </select>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: "8px 16px", border: "1px solid #d1d5db", borderRadius: "6px", fontSize: "14px", cursor: "pointer", backgroundColor: "white", color: "#374151" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{ padding: "8px 20px", border: "none", borderRadius: "6px", fontSize: "14px", cursor: loading ? "not-allowed" : "pointer", backgroundColor: loading ? "#a5b4fc" : "#4f46e5", color: "white", fontWeight: 500 }}
            >
              {loading ? "Saving..." : "Save Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
