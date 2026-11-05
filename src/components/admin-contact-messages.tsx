"use client";

import { useState, type FormEvent } from "react";

export interface AdminContactMessage {
  id: string;
  name: string;
  senderEmail: string;
  subject: string;
  message: string;
  isRead: boolean;
  status: "NEW" | "IN_PROGRESS" | "REPLIED" | "ARCHIVED";
  notificationStatus: "PENDING" | "SENT" | "FAILED";
  replyReference: string | null;
  repliedAt: string | null;
  createdAt: string;
}

interface AdminContactMessagesProps {
  initialMessages: AdminContactMessage[];
  initialTotal: number;
  initialError?: string;
}

const PAGE_SIZE = 25;

export function AdminContactMessages({ initialMessages, initialTotal, initialError }: AdminContactMessagesProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [total, setTotal] = useState(initialTotal);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [read, setRead] = useState("all");
  const [page, setPage] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(initialError ?? "");
  const [notice, setNotice] = useState("");

  async function loadMessages(nextPage = 1) {
    setBusy(true);
    setError("");
    setNotice("");
    const params = new URLSearchParams({ page: String(nextPage) });
    if (query.trim()) params.set("q", query.trim());
    if (status !== "all") params.set("status", status);
    if (read !== "all") params.set("read", read);

    try {
      const response = await fetch(`/api/admin/contact-messages?${params}`, { cache: "no-store" });
      const result = await response.json() as { messages?: AdminContactMessage[]; total?: number; error?: string };
      if (!response.ok || !result.messages) throw new Error(result.error ?? "Messages could not be loaded.");
      setMessages(result.messages);
      setTotal(result.total ?? 0);
      setPage(nextPage);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Messages could not be loaded.");
    } finally {
      setBusy(false);
    }
  }

  async function updateMessage(id: string, update: Record<string, unknown>, confirmation: string) {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch(`/api/admin/contact-messages/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(update),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Message could not be updated.");
      setNotice(confirmation);
      await loadMessages(page);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Message could not be updated.");
      setBusy(false);
    }
  }

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void loadMessages(1);
  }

  function saveReplyReference(event: FormEvent<HTMLFormElement>, id: string) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const replyReference = String(formData.get("replyReference") ?? "").trim();
    if (!replyReference) {
      setError("Enter the external reply reference before saving.");
      return;
    }
    void updateMessage(id, { replyReference, status: "REPLIED" }, "Reply reference saved. No email reply was sent.");
  }

  return (
    <section className="admin-messages" aria-labelledby="admin-messages-title">
      <div className="admin-messages-heading">
        <div>
          <p className="eyebrow">Inbox</p>
          <h2 id="admin-messages-title">Contact messages</h2>
          <p>{total} messages stored privately in Matchids.</p>
        </div>
        <button className="button button-outline" type="button" onClick={() => void loadMessages(page)} disabled={busy}>
          Refresh
        </button>
      </div>

      <form className="admin-message-filters" onSubmit={search} role="search">
        <label>
          <span>Search messages</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} maxLength={100} placeholder="Name, email, subject, or message" />
        </label>
        <label>
          <span>Status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">All statuses</option>
            <option value="NEW">New</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="REPLIED">Replied</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </label>
        <label>
          <span>Read state</span>
          <select value={read} onChange={(event) => setRead(event.target.value)}>
            <option value="all">All messages</option>
            <option value="false">Unread</option>
            <option value="true">Read</option>
          </select>
        </label>
        <button className="button button-ink" type="submit" disabled={busy}>Search</button>
      </form>

      {error && <p className="form-error" role="alert">{error}</p>}
      {notice && <p className="contact-success" role="status">{notice}</p>}
      {initialError && !messages.length && !error ? <div className="empty-state"><h3>Inbox unavailable</h3><p>{initialError}</p></div> : null}
      {!messages.length && !initialError && !error && <div className="empty-state"><h3>No contact messages</h3><p>New messages will appear here after they are saved.</p></div>}

      <div className="admin-message-list" aria-busy={busy}>
        {messages.map((message) => (
          <article className="admin-message" key={message.id}>
            <div className="admin-message-heading">
              <div>
                <p className="eyebrow">{message.status.replaceAll("_", " ")} · {message.isRead ? "Read" : "Unread"}</p>
                <h3>{message.subject}</h3>
                <p className="admin-message-sender">
                  <a href={`mailto:${message.senderEmail}`}>{message.name} · {message.senderEmail}</a>
                  <time dateTime={message.createdAt}>{new Date(message.createdAt).toLocaleString()}</time>
                </p>
              </div>
              <span className={`notification-status notification-${message.notificationStatus.toLowerCase()}`}>
                Email {message.notificationStatus.toLowerCase()}
              </span>
            </div>
            <p className="admin-message-body">{message.message}</p>
            <div className="admin-message-actions">
              <button type="button" className="button button-outline" disabled={busy} onClick={() => void updateMessage(message.id, { isRead: !message.isRead }, message.isRead ? "Message marked unread." : "Message marked read.")}>
                Mark {message.isRead ? "unread" : "read"}
              </button>
              {message.status !== "IN_PROGRESS" && (
                <button type="button" className="button button-outline" disabled={busy} onClick={() => void updateMessage(message.id, { status: "IN_PROGRESS" }, "Message marked in progress.")}>
                  Mark in progress
                </button>
              )}
              <button type="button" className="button button-outline" disabled={busy} onClick={() => void updateMessage(message.id, { status: message.status === "ARCHIVED" ? "IN_PROGRESS" : "ARCHIVED" }, message.status === "ARCHIVED" ? "Message restored to in progress." : "Message archived.")}>
                {message.status === "ARCHIVED" ? "Restore" : "Archive"}
              </button>
            </div>
            <form className="admin-reply-reference" onSubmit={(event) => saveReplyReference(event, message.id)}>
              <label>
                <span>Reply workflow reference</span>
                <input name="replyReference" defaultValue={message.replyReference ?? ""} maxLength={500} placeholder="Ticket ID or sent-reply reference" />
              </label>
              <button type="submit" className="button button-ink" disabled={busy}>Save reference</button>
            </form>
          </article>
        ))}
      </div>

      {total > PAGE_SIZE && (
        <nav className="admin-message-pagination" aria-label="Contact message pages">
          <button type="button" className="button button-outline" disabled={busy || page <= 1} onClick={() => void loadMessages(page - 1)}>Previous</button>
          <span aria-current="page">Page {page} of {Math.ceil(total / PAGE_SIZE)}</span>
          <button type="button" className="button button-outline" disabled={busy || page >= Math.ceil(total / PAGE_SIZE)} onClick={() => void loadMessages(page + 1)}>Next</button>
        </nav>
      )}
    </section>
  );
}