import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.scss'
import { useGetPostsQuery, useGetTodosQuery, useCreatePostMutation } from './api/modules/dummyApi'
import { Input as AppInput, Textarea, Text, Button, Icon } from './atoms'

// ── Upload icon ───────────────────────────────────────────────────────────────
function UploadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}

// ── Plus icon ─────────────────────────────────────────────────────────────────
function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="5" y2="19" /><line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  )
}

// ── Trash icon ────────────────────────────────────────────────────────────────
function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" /><path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}

// ── Arrow icon ────────────────────────────────────────────────────────────────
function ArrowRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" x2="19" y1="12" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function App() {
  const [count, setCount] = useState(0)
  const [formError, setFormError] = useState<string | undefined>(undefined)

  // ── Posts — cached for 2 minutes ──────────────────────────────────────────
  const {
    data: posts,
    isLoading: postsLoading,
    isError: postsError,
  } = useGetPostsQuery()

  // ── Todos — never cached, always fresh ────────────────────────────────────
  const {
    data: todos,
    isLoading: todosLoading,
    isError: todosError,
  } = useGetTodosQuery()

  // ── Create post mutation ───────────────────────────────────────────────────
  const [createPost, { isLoading: creating, data: createdPost }] = useCreatePostMutation()

  const handleCreatePost = () => {
    createPost({ userId: 1, title: 'New Post', body: 'Created via RTK Query mutation' })
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <Text variant="h1" className="text-3xl font-bold underline text-red-500">
          RTK Query Demo
        </Text>
        <Button
          variant="outline"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </Button>
      </section>

      {/* ── Posts (cached 2min) ─────────────────────────────────────────── */}
      <section style={{ padding: '32px', borderTop: '1px solid var(--border)' }}>
        <Text variant="h3" style={{ marginBottom: '16px' }}>
          📦 Posts{' '}
          <Text as="span" variant="caption" color="muted">
            (cached 2 min)
          </Text>
        </Text>

        {postsLoading && <Text color="muted">Loading posts…</Text>}
        {postsError && <Text color="destructive">Failed to load posts.</Text>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto' }}>
          {posts?.slice(0, 5).map((post) => (
            <div
              key={post.id}
              style={{
                background: 'var(--code-bg)',
                borderRadius: '8px',
                padding: '12px 16px',
                textAlign: 'left',
              }}
            >
              <Text variant="label">#{post.id} — {post.title}</Text>
              <Text variant="body-sm" color="muted" style={{ marginTop: '4px' }}>
                {post.body}
              </Text>
            </div>
          ))}
        </div>
      </section>

      {/* ── Todos (no cache) ────────────────────────────────────────────── */}
      <section style={{ padding: '32px', borderTop: '1px solid var(--border)' }}>
        <Text variant="h3" style={{ marginBottom: '16px' }}>
          ✅ Todos{' '}
          <Text as="span" variant="caption" color="muted">
            (no cache — always fresh)
          </Text>
        </Text>

        {todosLoading && <Text color="muted">Loading todos…</Text>}
        {todosError && <Text color="destructive">Failed to load todos.</Text>}

        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', display: 'inline-block' }}>
          {todos?.map((todo) => (
            <li key={todo.id} style={{ display: 'flex', gap: '10px', padding: '6px 0' }}>
              <span>{todo.completed ? '✅' : '⬜'}</span>
              <span style={{ color: todo.completed ? 'var(--text)' : 'var(--text-h)' }}>
                {todo.title}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Create Post mutation ─────────────────────────────────────────── */}
      <section style={{ padding: '32px', borderTop: '1px solid var(--border)' }}>
        <Text variant="h3" style={{ marginBottom: '16px' }}>🚀 Mutation — Create Post</Text>
        <Button onClick={handleCreatePost} loading={creating}>
          Create Dummy Post
        </Button>
        {createdPost && (
          <div
            style={{
              marginTop: '16px',
              background: 'var(--accent-bg)',
              border: '1px solid var(--accent-border)',
              borderRadius: '8px',
              padding: '12px 16px',
              textAlign: 'left',
            }}
          >
            <Text variant="label">✅ Post created (id: {createdPost.id})</Text>
            <Text variant="body-sm" style={{ marginTop: '4px' }}>{createdPost.title}</Text>
          </div>
        )}
      </section>

      {/* ── Input Atom Demo ──────────────────────────────────────────────── */}
      <section style={{ padding: '32px', borderTop: '1px solid var(--border)' }}>
        <Text variant="h3" style={{ marginBottom: '24px' }}>🧩 Input Atom</Text>

        <div style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>

          {/* Project Name — matches Figma */}
          <AppInput
            id="field-project-name"
            label="Project Name"
            type="text"
            placeholder="Project Name"
            required
          />

          {/* With tooltip */}
          <AppInput
            id="field-description"
            label="Description"
            type="text"
            placeholder="Enter a description..."
            required
            tooltip="A short description of your project."
          />

          {/* Email */}
          <AppInput
            id="field-email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            required
          />

          {/* Password */}
          <AppInput
            id="field-password"
            label="Password"
            type="password"
            placeholder="••••••••"
            description="Must be at least 8 characters."
          />

          {/* With validation error */}
          <AppInput
            id="field-error-demo"
            label="Username"
            type="text"
            placeholder="Enter username"
            defaultValue="ab"
            error={formError}
            onBlur={(e) =>
              setFormError(
                e.target.value.length < 3
                  ? 'Username must be at least 3 characters.'
                  : undefined
              )
            }
            onChange={() => setFormError(undefined)}
          />

          {/* File input */}
          <AppInput
            id="field-avatar"
            label="Profile picture"
            type="file"
            accept="image/*"
            description="Accepted formats: JPG, PNG, WEBP. Max 2 MB."
          />

          {/* Disabled */}
          <AppInput
            id="field-disabled"
            label="Disabled field"
            type="text"
            placeholder="Not editable"
            disabled
          />

        </div>
      </section>

      {/* ── Textarea Atom Demo ───────────────────────────────────────────── */}
      <section style={{ padding: '32px', borderTop: '1px solid var(--border)' }}>
        <Text variant="h3" style={{ marginBottom: '24px' }}>🧩 Textarea Atom</Text>

        <div style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>

          {/* Basic — matches Figma description field */}
          <Textarea
            id="ta-description"
            label="Description"
            placeholder="Enter a description..."
            required
            tooltip="A short description of your project."
            rows={4}
          />

          {/* With character counter */}
          <Textarea
            id="ta-bio"
            label="Bio"
            placeholder="Tell us about yourself..."
            description="A brief summary shown on your public profile."
            maxLength={200}
            rows={3}
          />

          {/* No resize */}
          <Textarea
            id="ta-notes"
            label="Notes"
            placeholder="Add any notes here..."
            resize="none"
            rows={3}
          />

          {/* With error */}
          <Textarea
            id="ta-error"
            label="Feedback"
            placeholder="Your feedback..."
            error="Feedback must be at least 10 characters."
            rows={3}
          />

          {/* Disabled */}
          <Textarea
            id="ta-disabled"
            label="Read-only notes"
            defaultValue="This field cannot be edited."
            disabled
            rows={2}
          />

        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>

      {/* ── Button Atom Demo ─────────────────────────────────────────────── */}
      <section style={{ padding: '32px', borderTop: '1px solid var(--border)' }}>
        <Text variant="h3" style={{ marginBottom: '24px' }}>🔘 Button Atom</Text>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>

          {/* Variants */}
          <div>
            <Text variant="overline" color="muted" style={{ marginBottom: '12px', display: 'block' }}>Variants</Text>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <Text variant="overline" color="muted" style={{ marginBottom: '12px', display: 'block' }}>Sizes</Text>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
              <Button size="xs">X-Small</Button>
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          {/* With icons */}
          <div>
            <Text variant="overline" color="muted" style={{ marginBottom: '12px', display: 'block' }}>With Icons</Text>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
              <Button leftIcon={<PlusIcon />}>Add New</Button>
              <Button variant="outline" rightIcon={<ArrowRightIcon />}>Continue</Button>
              <Button variant="secondary" leftIcon={<UploadIcon />}>Upload</Button>
              <Button variant="destructive" leftIcon={<TrashIcon />}>Delete</Button>
            </div>
          </div>

          {/* Icon-only */}
          <div>
            <Text variant="overline" color="muted" style={{ marginBottom: '12px', display: 'block' }}>Icon Only</Text>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
              <Button size="icon" variant="default"><PlusIcon /></Button>
              <Button size="icon" variant="outline"><UploadIcon /></Button>
              <Button size="icon" variant="secondary"><ArrowRightIcon /></Button>
              <Button size="icon" variant="destructive"><TrashIcon /></Button>
              <Button size="icon-sm" variant="outline"><PlusIcon /></Button>
              <Button size="icon-lg" variant="default"><ArrowRightIcon /></Button>
            </div>
          </div>

          {/* Loading state */}
          <div>
            <Text variant="overline" color="muted" style={{ marginBottom: '12px', display: 'block' }}>Loading State</Text>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
              <Button loading>Saving…</Button>
              <Button variant="outline" loading>Loading…</Button>
              <Button variant="secondary" loading>Processing…</Button>
            </div>
          </div>

          {/* Disabled state */}
          <div>
            <Text variant="overline" color="muted" style={{ marginBottom: '12px', display: 'block' }}>Disabled State</Text>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
              <Button disabled>Default</Button>
              <Button variant="outline" disabled>Outline</Button>
              <Button variant="destructive" disabled>Destructive</Button>
            </div>
          </div>

          {/* Full width */}
          <div>
            <Text variant="overline" color="muted" style={{ marginBottom: '12px', display: 'block' }}>Full Width</Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Button fullWidth leftIcon={<UploadIcon />}>Upload File</Button>
              <Button fullWidth variant="outline">Cancel</Button>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* Icon Demo                                                          */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '48px 32px', maxWidth: '860px', margin: '0 auto' }}>
        <Text variant="h2" style={{ marginBottom: '8px' }}>Icon</Text>
        <Text variant="body" color="muted" style={{ marginBottom: '32px' }}>
          Loads SVGs by name from <code>src/assets/icons/</code>. Drop any <code>.svg</code> file there and pass its name.
        </Text>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* Sizes */}
          <div>
            <Text variant="overline" color="muted" style={{ marginBottom: '12px', display: 'block' }}>Sizes</Text>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-end' }}>
              {([16, 24, 32, 48, 64] as const).map((s) => (
                <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <Icon name="react" size={s} />
                  <Text variant="caption" color="muted">{s}</Text>
                </div>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <Text variant="overline" color="muted" style={{ marginBottom: '12px', display: 'block' }}>Color via prop</Text>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              {(['#00D8FF', '#6366f1', '#f43f5e', '#10b981', '#f59e0b']).map((c) => (
                <Icon key={c} name="react" size={36} color={c} />
              ))}
            </div>
          </div>

          {/* Opacity via Tailwind */}
          <div>
            <Text variant="overline" color="muted" style={{ marginBottom: '12px', display: 'block' }}>Tailwind className</Text>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <Icon name="react" size={36} className="opacity-25" />
              <Icon name="react" size={36} className="opacity-50" />
              <Icon name="react" size={36} className="opacity-75" />
              <Icon name="react" size={36} className="opacity-100" />
            </div>
          </div>

          {/* Inline with text */}
          <div>
            <Text variant="overline" color="muted" style={{ marginBottom: '12px', display: 'block' }}>Inline with text</Text>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="react" size={20} color="#00D8FF" label="React logo" />
              <Text variant="body">Built with React</Text>
            </div>
          </div>

          {/* Inside a Button */}
          <div>
            <Text variant="overline" color="muted" style={{ marginBottom: '12px', display: 'block' }}>Inside Button</Text>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
              <Button leftIcon={<Icon name="react" size={14} />}>Icon Left</Button>
              <Button variant="outline" rightIcon={<Icon name="react" size={14} />}>Icon Right</Button>
              <Button size="icon" variant="secondary"><Icon name="react" size={16} /></Button>
            </div>
          </div>

          {/* Missing icon fallback */}
          <div>
            <Text variant="overline" color="muted" style={{ marginBottom: '12px', display: 'block' }}>Missing icon fallback</Text>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="does-not-exist" size={32} className="rounded border border-dashed border-red-400" />
              <Text variant="caption" color="muted">name="does-not-exist" → empty placeholder (warning in console)</Text>
            </div>
          </div>

        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
