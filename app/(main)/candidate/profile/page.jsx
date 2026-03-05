"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider"; // adjust path

export default function CandidateProfilePage() {
  const { user } = useUser(); // ✅ global auth user

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [focused, setFocused] = useState(null);

  const [profile, setProfile] = useState({
    phone: "",
    date_of_birth: "",
    gender: "",
    location: "",
    experience_years: "",
    current_company: "",
    current_role: "",
    skills: "",
    resume_url: "",
    linkedin_url: "",
    github_url: "",
    bio: "",
  });

  // ✅ Fetch when user loads
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    getProfile();
  }, [user]);

  async function getProfile() {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("CandidateProfiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      // PGRST116 = no rows found (first time user)
      if (error && error.code !== "PGRST116") {
        throw error;
      }

      if (data) {
        setProfile({
          phone: data.phone || "",
          date_of_birth: data.date_of_birth || "",
          gender: data.gender || "",
          location: data.location || "",
          experience_years: data.experience_years || "",
          current_company: data.current_company || "",
          current_role: data.current_role || "",
          skills: data.skills || "",
          resume_url: data.resume_url || "",
          linkedin_url: data.linkedin_url || "",
          github_url: data.github_url || "",
          bio: data.bio || "",
        });
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(e) {
    e.preventDefault();
    if (!user) return;

    setSaving(true);

    try {
      const updates = {
        user_id: user.id,
        email: user.email,
        ...profile,
        experience_years: profile.experience_years
          ? parseFloat(profile.experience_years)
          : null,
        created_at: new Date(),
      };

      const { error } = await supabase
        .from("CandidateProfiles")
        .upsert(updates, { onConflict: "user_id" });

      if (error && error.message) {
        throw error;
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Error saving profile.");
    } finally {
      setSaving(false);
    }
  }

  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const card = {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: "24px 28px",
    marginBottom: 18,
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  };

  const lbl = {
    fontSize: 11.5,
    fontWeight: 500,
    color: "#6b7280",
    marginBottom: 6,
    display: "block",
  };

  const baseInput = {
  border: "1px solid #e5e7eb",
  borderRadius: 6,
  padding: "8px 12px",
  fontSize: 13.5,
  color: "#111827",
  background: "#fff",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

const inp = (name) => ({
  ...baseInput,
  borderColor: focused === name ? "#9ca3af" : "#e5e7eb",
  boxShadow:
    focused === name
      ? "0 0 0 3px rgba(156,163,175,0.15)"
      : "none",
});

const fp = (name, extra = {}) => ({
  name,
  value: profile[name] || "",
  onChange: handleChange,
  onFocus: () => setFocused(name),
  onBlur: () => setFocused(null),
  style: { ...inp(name), ...extra },
});

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "#f9fafb",
        }}
      >
        <p style={{ fontSize: 14, color: "#9ca3af" }}>
          Loading profile...
        </p>
      </div>
    );

  // ---- Your Entire UI remains SAME below ----

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '40px 32px', fontFamily: 'inherit' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>

        <h1 style={{ fontSize: 20, fontWeight: 600, color: '#111827', margin: 0 }}>Profile</h1>
        <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 4, marginBottom: 28 }}>Update your personal and professional details.</p>

        <form onSubmit={updateProfile}>

          {/* Personal Details */}
          <div style={card}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', margin: '0 0 18px 0' }}>Personal Details</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={lbl}>Phone</label>
                <input {...fp('phone')} placeholder="+1 (555) 000-0000" />
              </div>
              <div>
                <label style={lbl}>Date of Birth</label>
                <input type="date" {...fp('date_of_birth')} />
              </div>
              <div>
                <label style={lbl}>Gender</label>
                <select {...fp('gender', { cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none' })}>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div>
                <label style={lbl}>Location</label>
                <input {...fp('location')} placeholder="City, Country" />
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div style={card}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', margin: '0 0 18px 0' }}>Professional Experience</p>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={lbl}>Current Company</label>
                <input {...fp('current_company')} placeholder="Company name" />
              </div>
              <div>
                <label style={lbl}>Current Role</label>
                <input {...fp('current_role')} placeholder="e.g. Product Designer" />
              </div>
              <div>
                <label style={lbl}>Years of Exp.</label>
                <input type="number" {...fp('experience_years')} placeholder="0" min="0" max="60" step="0.5" />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>Skills</label>
              <input {...fp('skills')} placeholder="React, SQL, Figma, Python… (comma separated)" />
            </div>
            <div>
              <label style={lbl}>Bio</label>
              <textarea
                name="bio" value={profile.bio || ''} onChange={handleChange}
                onFocus={() => setFocused('bio')} onBlur={() => setFocused(null)}
                rows={3} placeholder="A short professional summary…"
                style={{
                  ...baseInput, resize: 'vertical', lineHeight: 1.6,
                  borderColor: focused === 'bio' ? '#9ca3af' : '#e5e7eb',
                  boxShadow: focused === 'bio' ? '0 0 0 3px rgba(156,163,175,0.15)' : 'none',
                }}
              />
            </div>
          </div>

          {/* Links & Documents */}
          <div style={card}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', margin: '0 0 18px 0' }}>Links & Documents</p>
            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>Resume URL</label>
              <input {...fp('resume_url')} placeholder="https://drive.google.com/…" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={lbl}>LinkedIn</label>
                <input {...fp('linkedin_url')} placeholder="https://linkedin.com/in/…" />
              </div>
              <div>
                <label style={lbl}>GitHub</label>
                <input {...fp('github_url')} placeholder="https://github.com/…" />
              </div>
            </div>
          </div>

          {/* Save */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12, paddingBottom: 24 }}>
            {saved && <span style={{ fontSize: 12, color: '#16a34a', fontWeight: 500 }}>Saved successfully</span>}
            <button
              type="submit"
              disabled={saving}
              style={{
                background: saving ? '#d1d5db' : '#111827',
                color: '#fff', fontSize: 13, fontWeight: 500,
                padding: '9px 26px', borderRadius: 8, border: 'none',
                cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
              }}
            >
              {saving ? 'Saving…' : 'Save Profile'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}