"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/app/provider";
import Link from "next/link";

export default function InterviewsPage() {
  const { user } = useUser();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`/api/candidate-interviews?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setInterviews(data.data || []);
        setLoading(false);
      });
  }, [user]);


  const getStatus = (recommeded) => {
    if (recommeded === true) {
      return (
        <span style={styles.badgeAccepted}>
          <span style={styles.badgeDot("#16a34a")} />
          Accepted
        </span>
      );
    }
    if (recommeded === false) {
      return (
        <span style={styles.badgeRejected}>
          <span style={styles.badgeDot("#dc2626")} />
          Rejected
        </span>
      );
    }
    return (
      <span style={styles.badgePending}>
        <span style={styles.badgeDot("#d97706")} />
        Pending
      </span>
    );
  };

  console.log("Interviews data: ", interviews);
  
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

        .page-wrapper {
          font-family: 'DM Sans', sans-serif;
          padding: 48px 32px;
        }

        .page-wrapper * {
          box-sizing: border-box;
        }

        .page-wrapper .iw-header {
          margin-bottom: 32px;
        }

        .page-wrapper .iw-header-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #9ca3af;
          margin-bottom: 8px;
        }

        .page-wrapper .iw-header-title {
          font-size: 28px;
          font-weight: 600;
          color: #111827;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .page-wrapper .iw-header-subtitle {
          font-size: 14px;
          color: #6b7280;
          margin-top: 4px;
        }

        .page-wrapper .iw-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03);
        }

        .page-wrapper .iw-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 28px;
          border-bottom: 1px solid #f3f4f6;
        }

        .page-wrapper .iw-card-header-left {
          font-size: 13px;
          font-weight: 500;
          color: #374151;
        }

        .page-wrapper .iw-count-badge {
          background: #f3f4f6;
          color: #6b7280;
          font-size: 12px;
          font-weight: 600;
          padding: 2px 10px;
          border-radius: 99px;
          font-family: 'DM Mono', monospace;
        }

        .page-wrapper .iw-table {
          width: 100%;
          border-collapse: collapse;
        }

        .page-wrapper .iw-table thead tr {
          background: #fafafa;
        }

        .page-wrapper .iw-table thead th {
          padding: 12px 28px;
          text-align: left;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #9ca3af;
          border-bottom: 1px solid #f3f4f6;
          white-space: nowrap;
        }

        .page-wrapper .iw-table tbody tr {
          border-bottom: 1px solid #f9fafb;
          transition: background 0.15s ease;
        }

        .page-wrapper .iw-table tbody tr:last-child {
          border-bottom: none;
        }

        .page-wrapper .iw-table tbody tr:hover {
          background: #fafafa;
        }

        .page-wrapper .iw-table td {
          padding: 18px 28px;
          font-size: 14px;
          color: #374151;
          vertical-align: middle;
        }

        .page-wrapper .iw-job-position {
          font-weight: 500;
          color: #111827;
          font-size: 14px;
          margin: 0;
        }

        .page-wrapper .iw-job-id {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: #9ca3af;
          margin-top: 3px;
        }

        .page-wrapper .iw-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
          font-weight: 500;
          color: #2563eb;
          text-decoration: none;
          padding: 7px 14px;
          border-radius: 8px;
          border: 1px solid #dbeafe;
          background: #eff6ff;
          transition: all 0.15s ease;
          white-space: nowrap;
        }

        .page-wrapper .iw-link:hover {
          background: #dbeafe;
          border-color: #93c5fd;
          color: #1d4ed8;
        }

        .page-wrapper .iw-arrow {
          width: 14px;
          height: 14px;
          transition: transform 0.15s ease;
        }

        .page-wrapper .iw-link:hover .iw-arrow {
          transform: translateX(2px);
        }

        .page-wrapper .iw-empty {
          padding: 64px 28px;
          text-align: center;
        }

        .page-wrapper .iw-empty-icon {
          font-size: 36px;
          margin-bottom: 12px;
          opacity: 0.4;
        }

        .page-wrapper .iw-empty-title {
          font-size: 15px;
          font-weight: 500;
          color: #6b7280;
          margin-bottom: 4px;
        }

        .page-wrapper .iw-empty-sub {
          font-size: 13px;
          color: #9ca3af;
        }

        .page-wrapper .iw-skeleton {
          background: linear-gradient(90deg, #f3f4f6 25%, #e9eaec 50%, #f3f4f6 75%);
          background-size: 200% 100%;
          animation: iw-shimmer 1.4s infinite;
          border-radius: 6px;
          height: 14px;
        }

        @keyframes iw-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="page-wrapper">
        <div className="iw-header">
          <p className="iw-header-label">Dashboard</p>
          <h1 className="iw-header-title">My Interviews</h1>
          <p className="iw-header-subtitle">Track your interview status and access your sessions below.</p>
        </div>

        <div className="iw-card">
          <div className="iw-card-header">
            <span className="iw-card-header-left">All Interviews</span>
            <span className="iw-count-badge">{interviews.length}</span>
          </div>

          <table className="iw-table">
            <thead>
              <tr>
                <th>Job Position</th>
                <th>Interview</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [0, 1, 2].map((i) => (
                  <tr key={i}>
                    <td><div className="iw-skeleton" style={{ width: "60%" }} /></td>
                    <td><div className="iw-skeleton" style={{ width: "40%" }} /></td>
                    <td><div className="iw-skeleton" style={{ width: "30%" }} /></td>
                  </tr>
                ))
              ) : interviews.length === 0 ? (
                <tr>
                  <td colSpan={3}>
                    <div className="iw-empty">
                      <div className="iw-empty-icon">📋</div>
                      <p className="iw-empty-title">No interviews yet</p>
                      <p className="iw-empty-sub">Your assigned interviews will appear here.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                interviews.slice().reverse().map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="iw-job-position">{item.jobPosition}</div>
                      <div className="iw-job-id">ID: {item.interview_id}</div>
                    </td>
                    <td>
                      <Link
                        href={`/interview/${item.interview_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="iw-link"
                      >
                        Start Interview
                        <svg className="iw-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </td>
                    <td>{getStatus(item.recommeded)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const styles = {
  badgeAccepted: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "5px 12px",
    borderRadius: "99px",
    fontSize: "12px",
    fontWeight: "600",
    background: "#f0fdf4",
    color: "#16a34a",
    border: "1px solid #bbf7d0",
  },
  badgeRejected: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "5px 12px",
    borderRadius: "99px",
    fontSize: "12px",
    fontWeight: "600",
    background: "#fef2f2",
    color: "#dc2626",
    border: "1px solid #fecaca",
  },
  badgePending: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "5px 12px",
    borderRadius: "99px",
    fontSize: "12px",
    fontWeight: "600",
    background: "#fffbeb",
    color: "#d97706",
    border: "1px solid #fde68a",
  },
  badgeDot: (color) => ({
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: color,
    display: "inline-block",
    flexShrink: 0,
  }),
};
