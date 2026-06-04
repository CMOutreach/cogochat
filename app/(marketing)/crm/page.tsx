"use client";

import { useState, useEffect, useCallback } from "react";

const PASSWORD = "conner2024";

const STATUSES = [
  "New",
  "Contacted",
  "Audit Done",
  "Proposal Sent",
  "Won",
  "Lost",
  "No Response",
];

const LEAD_SOURCES = ["Conner Found", "Owner Found"];

const SERVICES = [
  "Starter Website",
  "Growth Website",
  "Landing Page",
  "Lead Generation",
  "Ads Management",
  "Pro Full Service",
];

type SearchResult = {
  rowIndex: number;
  businessName: string;
  contactName: string;
  phone: string;
  email: string;
  location: string;
  leadSource: string;
  status: string;
  dealValue: string;
  monthlyValue: string;
  notes: string;
};

const inputClass =
  "w-full rounded-lg px-4 py-3 text-white placeholder-gray-500 text-base focus:outline-none focus:ring-2 focus:ring-[#1e9878]";

const inputStyle = {
  background: "#111a16",
  border: "1px solid #1e3d2f",
};

const labelClass = "block text-sm font-medium text-gray-400 mb-1";

export default function CRMPage() {
  const [authed, setAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [mode, setMode] = useState<"add" | "update">("add");

  // Add mode state
  const [addForm, setAddForm] = useState({
    businessName: "",
    contactName: "",
    phone: "",
    email: "",
    location: "",
    leadSource: "Conner Found",
    status: "New",
    service: "",
    dealValue: "",
    monthlyValue: "",
    notes: "",
  });

  // Update mode state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedRow, setSelectedRow] = useState<SearchResult | null>(null);
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateNotes, setUpdateNotes] = useState("");

  // Shared state
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Persist auth in sessionStorage
  useEffect(() => {
    if (sessionStorage.getItem("crm_auth") === "true") setAuthed(true);
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (passwordInput === PASSWORD) {
      setAuthed(true);
      sessionStorage.setItem("crm_auth", "true");
    } else {
      setPasswordError(true);
      setPasswordInput("");
    }
  }

  // Debounced search
  const doSearch = useCallback(async (q: string) => {
    if (q.length < 2) {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    try {
      const res = await fetch(`/api/crm?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setSearchResults(data.rows || []);
    } catch {
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => doSearch(searchQuery), 400);
    return () => clearTimeout(timer);
  }, [searchQuery, doSearch]);

  function selectRow(row: SearchResult) {
    setSelectedRow(row);
    setUpdateStatus(row.status || "New");
    setUpdateNotes(row.notes || "");
    setSearchResults([]);
    setSearchQuery(row.businessName);
  }

  function clearSuccess() {
    setSuccessMessage("");
    setErrorMessage("");
  }

  async function handleAddSubmit(e: React.FormEvent) {
    e.preventDefault();
    clearSuccess();
    if (!addForm.businessName.trim()) {
      setErrorMessage("Business name is required.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "add", ...addForm }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setErrorMessage(data.error || "Something went wrong.");
      } else {
        setSuccessMessage("Lead added successfully.");
        setAddForm({
          businessName: "",
          contactName: "",
          phone: "",
          email: "",
          location: "",
          leadSource: "Conner Found",
          status: "New",
          service: "",
          dealValue: "",
          monthlyValue: "",
          notes: "",
        });
      }
    } catch {
      setErrorMessage("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleUpdateSubmit(e: React.FormEvent) {
    e.preventDefault();
    clearSuccess();
    if (!selectedRow) {
      setErrorMessage("Select a lead to update first.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "update",
          rowIndex: selectedRow.rowIndex,
          status: updateStatus,
          notes: updateNotes,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setErrorMessage(data.error || "Something went wrong.");
      } else {
        setSuccessMessage(`${selectedRow.businessName} updated.`);
        setSelectedRow(null);
        setSearchQuery("");
        setUpdateStatus("");
        setUpdateNotes("");
      }
    } catch {
      setErrorMessage("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // Login screen
  if (!authed) {
    return (
      <div
        style={{ background: "#0a0f0d", minHeight: "100vh" }}
        className="flex flex-col items-center justify-center px-6"
      >
        <div className="w-full max-w-sm">
          <h1
            className="text-3xl font-bold mb-2 text-center"
            style={{ color: "#1e9878" }}
          >
            CogoChat
          </h1>
          <p className="text-gray-500 text-center text-sm mb-8">CRM Access</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className={labelClass}>Password</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError(false);
                }}
                placeholder="Enter password"
                className={inputClass}
                style={inputStyle}
                autoFocus
              />
              {passwordError && (
                <p className="text-red-400 text-sm mt-2">
                  Wrong password. Try again.
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white text-base mt-2 active:opacity-80 transition-opacity"
              style={{ background: "#1e9878" }}
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Main CRM
  return (
    <div
      style={{ background: "#0a0f0d", minHeight: "100vh" }}
      className="flex flex-col items-center px-4 py-8"
    >
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold" style={{ color: "#1e9878" }}>
            CogoChat
          </h1>
          <button
            onClick={() => {
              sessionStorage.removeItem("crm_auth");
              setAuthed(false);
            }}
            className="text-gray-600 text-sm"
          >
            Log out
          </button>
        </div>

        {/* Mode toggle */}
        <div
          className="flex rounded-lg p-1 mb-6"
          style={{ background: "#111a16", border: "1px solid #1e3d2f" }}
        >
          {(["add", "update"] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                clearSuccess();
              }}
              className="flex-1 py-2.5 rounded-md text-sm font-semibold transition-all"
              style={
                mode === m
                  ? { background: "#1e9878", color: "#fff" }
                  : { color: "#6b7280" }
              }
            >
              {m === "add" ? "ADD NEW LEAD" : "UPDATE LEAD"}
            </button>
          ))}
        </div>

        {/* Success / error messages */}
        {successMessage && (
          <div
            className="rounded-lg px-4 py-3 mb-4 text-sm font-medium"
            style={{ background: "#0d2e22", color: "#1e9878", border: "1px solid #1e9878" }}
          >
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div
            className="rounded-lg px-4 py-3 mb-4 text-sm font-medium"
            style={{ background: "#2e0d0d", color: "#f87171", border: "1px solid #f87171" }}
          >
            {errorMessage}
          </div>
        )}

        {/* ADD FORM */}
        {mode === "add" && (
          <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
            <div>
              <label className={labelClass}>Business Name *</label>
              <input
                type="text"
                value={addForm.businessName}
                onChange={(e) =>
                  setAddForm({ ...addForm, businessName: e.target.value })
                }
                placeholder="e.g. Smiths Plumbing"
                className={inputClass}
                style={inputStyle}
              />
            </div>

            <div>
              <label className={labelClass}>Contact Name</label>
              <input
                type="text"
                value={addForm.contactName}
                onChange={(e) =>
                  setAddForm({ ...addForm, contactName: e.target.value })
                }
                placeholder="e.g. John Smith"
                className={inputClass}
                style={inputStyle}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Phone</label>
                <input
                  type="tel"
                  value={addForm.phone}
                  onChange={(e) =>
                    setAddForm({ ...addForm, phone: e.target.value })
                  }
                  placeholder="07..."
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
              <div>
                <label className={labelClass}>Location</label>
                <input
                  type="text"
                  value={addForm.location}
                  onChange={(e) =>
                    setAddForm({ ...addForm, location: e.target.value })
                  }
                  placeholder="Town"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                value={addForm.email}
                onChange={(e) =>
                  setAddForm({ ...addForm, email: e.target.value })
                }
                placeholder="email@example.com"
                className={inputClass}
                style={inputStyle}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Lead Source</label>
                <select
                  value={addForm.leadSource}
                  onChange={(e) =>
                    setAddForm({ ...addForm, leadSource: e.target.value })
                  }
                  className={inputClass}
                  style={inputStyle}
                >
                  {LEAD_SOURCES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Status</label>
                <select
                  value={addForm.status}
                  onChange={(e) =>
                    setAddForm({ ...addForm, status: e.target.value })
                  }
                  className={inputClass}
                  style={inputStyle}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Service</label>
              <select
                value={addForm.service}
                onChange={(e) =>
                  setAddForm({ ...addForm, service: e.target.value })
                }
                className={inputClass}
                style={inputStyle}
              >
                <option value="">Select a service</option>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Deal Value (£)</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={addForm.dealValue}
                  onChange={(e) =>
                    setAddForm({ ...addForm, dealValue: e.target.value })
                  }
                  placeholder="499"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
              <div>
                <label className={labelClass}>Monthly (£/mo)</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={addForm.monthlyValue}
                  onChange={(e) =>
                    setAddForm({ ...addForm, monthlyValue: e.target.value })
                  }
                  placeholder="149"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Notes</label>
              <textarea
                value={addForm.notes}
                onChange={(e) =>
                  setAddForm({ ...addForm, notes: e.target.value })
                }
                placeholder="Any notes about this lead..."
                rows={4}
                className={inputClass}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-lg font-bold text-white text-base mt-2 active:opacity-80 transition-opacity disabled:opacity-50"
              style={{ background: "#1e9878" }}
            >
              {submitting ? "Adding..." : "ADD LEAD"}
            </button>
          </form>
        )}

        {/* UPDATE FORM */}
        {mode === "update" && (
          <form onSubmit={handleUpdateSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <label className={labelClass}>Search by Business Name</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedRow(null);
                  clearSuccess();
                }}
                placeholder="Start typing a business name..."
                className={inputClass}
                style={inputStyle}
              />
              {searching && (
                <p className="text-gray-500 text-sm mt-1">Searching...</p>
              )}

              {searchResults.length > 0 && (
                <div
                  className="mt-1 rounded-lg overflow-hidden"
                  style={{ border: "1px solid #1e3d2f", background: "#111a16" }}
                >
                  {searchResults.map((row) => (
                    <button
                      key={row.rowIndex}
                      type="button"
                      onClick={() => selectRow(row)}
                      className="w-full text-left px-4 py-3 text-sm border-b last:border-b-0 active:opacity-70 transition-opacity"
                      style={{ borderColor: "#1e3d2f", color: "#e5e7eb" }}
                    >
                      <span className="font-medium">{row.businessName}</span>
                      {row.contactName && (
                        <span className="text-gray-500 ml-2">
                          {row.contactName}
                        </span>
                      )}
                      <span
                        className="ml-2 text-xs px-2 py-0.5 rounded-full"
                        style={{ background: "#0d2e22", color: "#1e9878" }}
                      >
                        {row.status || "No status"}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {searchQuery.length >= 2 &&
                !searching &&
                searchResults.length === 0 &&
                !selectedRow && (
                  <p className="text-gray-500 text-sm mt-1">No leads found.</p>
                )}
            </div>

            {selectedRow && (
              <>
                {/* Selected lead summary */}
                <div
                  className="rounded-lg px-4 py-3 text-sm"
                  style={{ background: "#0d2e22", border: "1px solid #1e3d2f" }}
                >
                  <p className="font-semibold text-white mb-1">
                    {selectedRow.businessName}
                  </p>
                  {selectedRow.contactName && (
                    <p className="text-gray-400">{selectedRow.contactName}</p>
                  )}
                  {selectedRow.phone && (
                    <p className="text-gray-400">{selectedRow.phone}</p>
                  )}
                  {selectedRow.leadSource && (
                    <p className="text-gray-500 text-xs mt-1">
                      {selectedRow.leadSource}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Status</label>
                  <select
                    value={updateStatus}
                    onChange={(e) => setUpdateStatus(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Notes</label>
                  <textarea
                    value={updateNotes}
                    onChange={(e) => setUpdateNotes(e.target.value)}
                    placeholder="Add or update notes..."
                    rows={5}
                    className={inputClass}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-lg font-bold text-white text-base mt-2 active:opacity-80 transition-opacity disabled:opacity-50"
                  style={{ background: "#1e9878" }}
                >
                  {submitting ? "Saving..." : "SAVE UPDATE"}
                </button>
              </>
            )}
          </form>
        )}

        <p className="text-center text-gray-700 text-xs mt-10 mb-4">
          CogoChat CRM
        </p>
      </div>
    </div>
  );
}
