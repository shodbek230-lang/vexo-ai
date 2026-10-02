'use client';

import { useMemo, useState } from 'react';

type UserRow = {
  id: string;
  username: string;
  email: string;
  joined: string;
  limit: number;
  used: number;
  status: 'Active' | 'Blocked';
};

type ProjectRow = {
  title: string;
  type: string;
  owner: string;
  updated: string;
  status: 'Ready' | 'Building' | 'Queued';
};

const quickPrompts = [
  '🌐 Sayt yaratish',
  '🤖 Telegram bot yaratish',
  '📱 Android ilova yaratish',
  '📦 APK yaratish',
  '💻 Web app yaratish',
  '🗄️ Database yaratish',
];

const projectCards = [
  { title: 'Website', status: 'Ready', accent: 'cyan' },
  { title: 'Telegram Bot', status: 'Building', accent: 'violet' },
  { title: 'Android App', status: 'Queued', accent: 'amber' },
  { title: 'API', status: 'Ready', accent: 'green' },
];

const stats = [
  { label: 'Jami foydalanuvchilar', value: '12.4K' },
  { label: 'Faol loyihalar', value: '1,780' },
  { label: 'Buildlar', value: '8,430' },
  { label: 'Deploylar', value: '3,990' },
];

const users: UserRow[] = [
  { id: 'USR-1001', username: 'jigar', email: 'jigar@vexo.ai', joined: '2025-01-12', limit: 1000, used: 840, status: 'Active' },
  { id: 'USR-1002', username: 'malika', email: 'malika@gmail.com', joined: '2025-02-03', limit: 1000, used: 605, status: 'Active' },
  { id: 'USR-1003', username: 'davron', email: 'davron@gmail.com', joined: '2025-02-18', limit: 1000, used: 995, status: 'Active' },
  { id: 'USR-1004', username: 'nargiz', email: 'nargiz@demo.io', joined: '2025-03-08', limit: 1000, used: 220, status: 'Blocked' },
];

const projects: ProjectRow[] = [
  { title: 'CinemaBot', type: 'Telegram Bot', owner: 'jigar', updated: '1h ago', status: 'Ready' },
  { title: 'FashionHub', type: 'Website', owner: 'malika', updated: '3h ago', status: 'Building' },
  { title: 'Valyuta AI', type: 'Web App', owner: 'davron', updated: 'Today', status: 'Queued' },
  { title: 'CRM Panel', type: 'Backend', owner: 'nargiz', updated: '2d ago', status: 'Ready' },
];

const usageRows = [
  { label: 'AI used', value: '840 / 1000', width: '84%' },
  { label: 'Today projects', value: '14', width: '64%' },
  { label: 'Build success', value: '96%', width: '96%' },
];

const chatMessages = [
  { id: 1, sender: 'ai', text: 'Salom! Vexo AI orqali qaysi loyihani yaratishni xohlaysiz?', time: '09:41' },
  { id: 2, sender: 'user', text: 'Telegram uchun kino bot yarat', time: '09:42' },
  { id: 3, sender: 'ai', text: 'Yaxshi. Men loyiha rejasini tuzaman, kerakli fayllarni yarataman va workspace ichida ko’rsataman.', time: '09:42' },
  { id: 4, sender: 'ai', text: 'Reja: 1) bot struktura, 2) commands, 3) database schema, 4) README, 5) run script.', time: '09:43' },
];

const files = [
  'src/app/page.tsx',
  'src/components/ChatPanel.tsx',
  'src/components/Workspace.tsx',
  'src/lib/api.ts',
  'README.md',
  'package.json',
];

export default function HomePage() {
  const [selectedPrompt, setSelectedPrompt] = useState('🌐 Sayt yaratish');
  const [inputValue, setInputValue] = useState('Telegram uchun kino bot yarat');

  const remainingLimit = useMemo(() => 1000 - 840, []);

  return (
    <main className="page-shell">
      <div className="app-wrapper">
        <aside className="sidebar">
          <div className="brand-box">
            <div className="brand-mark">V</div>
            <div>
              <div className="brand-title">Vexo AI</div>
              <div className="brand-subtitle">AI platform</div>
            </div>
          </div>

          <nav className="nav-menu">
            {['Dashboard', 'Chats', 'Projects', 'Workspace', 'Builds', 'Deploy', 'GitHub', 'Termux', 'Database', 'Settings'].map((item, index) => (
              <button key={item} className={`nav-item ${index === 1 ? 'active' : ''}`}>
                <span>{item}</span>
                {index === 1 && <span className="pill-count">12</span>}
              </button>
            ))}
          </nav>

          <div className="limit-card">
            <div className="tiny-label">AI LIMIT</div>
            <div className="limit-main">
              840 <span>/ 1000</span>
            </div>
            <div className="meter">
              <span style={{ width: '84%' }} />
            </div>
          </div>

          <div className="sidebar-user">
            <div>
              <div className="user-name">Jigar</div>
              <div className="user-email">admin@vexo.ai</div>
            </div>
            <div className="user-avatar" />
          </div>
        </aside>

        <div className="content-area">
          <header className="topbar">
            <div>
              <div className="tiny-label cyan">Vexo AI</div>
              <h1>AI bilan istagan narsangni yarat.</h1>
            </div>
            <div className="top-actions">
              <button className="btn ghost">+ New project</button>
              <button className="btn primary">Create project</button>
            </div>
          </header>

          <section className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <div className="stat-label">{stat.label}</div>
                <div className="stat-value">{stat.value}</div>
              </div>
            ))}
          </section>

          <section className="main-grid">
            <div className="panel left-panel">
              <div className="panel-header">
                <div>
                  <div className="tiny-label violet">MAIN AI CHAT</div>
                  <h2>Project generation</h2>
                </div>
                <button className="btn small ghost">New chat</button>
              </div>

              <div className="prompt-row">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    className={`prompt-chip ${selectedPrompt === prompt ? 'active' : ''}`}
                    onClick={() => setSelectedPrompt(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="chat-box">
                <div className="chat-list">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`bubble ${msg.sender === 'user' ? 'user' : 'ai'}`}>
                      <div>{msg.text}</div>
                      <span>{msg.time}</span>
                    </div>
                  ))}
                </div>

                <div className="composer">
                  <button className="btn small ghost">+ File</button>
                  <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Buyruq yozing..."
                  />
                  <button className="btn small primary">Send</button>
                </div>
              </div>
            </div>

            <div className="stack-col">
              <div className="panel">
                <div className="panel-header small-header">
                  <h3>Project workspace</h3>
                  <span className="status-green">Live</span>
                </div>
                <div className="file-list">
                  {files.map((file) => (
                    <div key={file} className="file-item">
                      <div className="file-left">
                        <span className="code-tag">{'</>'}</span>
                        <span>{file}</span>
                      </div>
                      <span className="file-edit">edit</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel">
                <div className="panel-header small-header">
                  <h3>Build status</h3>
                  <span className="status-green">Success</span>
                </div>
                <div className="progress-stack">
                  {usageRows.map((row) => (
                    <div key={row.label} className="progress-row">
                      <div className="progress-meta">
                        <span>{row.label}</span>
                        <span>{row.value}</span>
                      </div>
                      <div className="meter soft">
                        <span style={{ width: row.width }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mini-grid">
            {projectCards.map((card) => (
              <div key={card.title} className="mini-card">
                <span className={`chip ${card.accent}`}>{card.status}</span>
                <h4>{card.title}</h4>
                <div className="mini-visual">
                  <div className="visual-lines">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="visual-ai">AI</div>
                </div>
              </div>
            ))}
          </section>

          <section className="admin-section">
            <div className="panel admin-panel">
              <div className="panel-header">
                <div>
                  <div className="tiny-label cyan">ADMIN PANEL</div>
                  <h2>Foydalanuvchilar va limitlar</h2>
                </div>
                <button className="btn small primary">+ Add user</button>
              </div>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Joined</th>
                      <th>Limit</th>
                      <th>Used</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.joined}</td>
                        <td>{user.limit}</td>
                        <td>{user.used}</td>
                        <td>
                          <span className={`status-badge ${user.status === 'Active' ? 'active' : 'blocked'}`}>
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="admin-section">
            <div className="panel admin-panel">
              <div className="panel-header">
                <div>
                  <div className="tiny-label violet">PROJECTS</div>
                  <h2>Recent projects</h2>
                </div>
              </div>

              <div className="project-list">
                {projects.map((project) => (
                  <div key={project.title} className="project-row">
                    <div>
                      <div className="project-title">{project.title}</div>
                      <div className="project-meta">{project.type} • {project.owner}</div>
                    </div>
                    <div className="project-state">
                      <span className={`status-badge ${project.status === 'Ready' ? 'active' : project.status === 'Building' ? 'warning' : 'neutral'}`}>
                        {project.status}
                      </span>
                      <span className="project-updated">{project.updated}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
