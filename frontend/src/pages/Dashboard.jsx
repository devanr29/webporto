import { useState, useCallback } from 'react'
import { useApi, useMutation } from '../hooks/useApi'
import { itemsApi } from '../services/api'
import { useApp } from '../context/AppContext'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

const EMPTY_FORM = { title: '', description: '' }

export default function Dashboard() {
  const { notify } = useApp()

  // ── Data fetching ──
  const {
    data: result,
    loading,
    error,
    execute: refetch,
  } = useApi(useCallback(() => itemsApi.getAll({ limit: 100 }), []))

  const items = result?.items ?? []

  // ── Dialog state ──
  const [dialog, setDialog]       = useState(null) // null | { mode, item? }
  const [form, setForm]           = useState(EMPTY_FORM)
  const [formErrors, setFormErrors] = useState({})

  // ── Mutations ──
  const { mutate: create, loading: creating } = useMutation(itemsApi.create)
  const { mutate: update, loading: updating } = useMutation(
    (id, data) => itemsApi.update(id, data),
  )
  const { mutate: remove } = useMutation(itemsApi.remove)

  // ── Handlers ──
  function openCreate() {
    setForm(EMPTY_FORM)
    setFormErrors({})
    setDialog({ mode: 'create' })
  }

  function openEdit(item) {
    setForm({ title: item.title, description: item.description ?? '' })
    setFormErrors({})
    setDialog({ mode: 'edit', item })
  }

  function closeDialog() {
    setDialog(null)
  }

  function validate() {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Title is required'
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  function setField(name) {
    return (e) => setForm(prev => ({ ...prev, [name]: e.target.value }))
  }

  async function handleSubmit() {
    if (!validate()) return
    try {
      if (dialog.mode === 'create') {
        await create(form)
        notify('Item created', 'success')
      } else {
        await update(dialog.item.id, form)
        notify('Item updated', 'success')
      }
      closeDialog()
      refetch()
    } catch (err) {
      notify(err.message, 'error')
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this item? This cannot be undone.')) return
    try {
      await remove(id)
      notify('Item deleted', 'success')
      refetch()
    } catch (err) {
      notify(err.message, 'error')
    }
  }

  const isSaving = creating || updating

  return (
    <div className="page">
      <div className="container">

        {/* Header */}
        <div className="page__header">
          <div className="page__heading">
            <h1 className="page__title">Dashboard</h1>
            <p className="page__subtitle">
              {result ? `${result.total} item${result.total !== 1 ? 's' : ''}` : ''}
            </p>
          </div>
          <Button onClick={openCreate}>+ New Item</Button>
        </div>

        {/* States */}
        {loading && <div className="spinner" aria-label="Loading" />}
        {error   && <p className="text-error mt-md">{error}</p>}

        {/* Table */}
        {!loading && !error && (
          items.length === 0 ? (
            <div className="empty">
              <div className="empty__title">No items yet</div>
              <p className="empty__text">Create your first item to get started.</p>
              <Button onClick={openCreate}>Create Item</Button>
            </div>
          ) : (
            <Card flush>
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.id}>
                        <td className="text-dim text-sm">#{item.id}</td>
                        <td><strong>{item.title}</strong></td>
                        <td className="text-muted text-sm">
                          {item.description || <span className="text-dim">—</span>}
                        </td>
                        <td>
                          <span className={`badge badge--${item.is_active ? 'active' : 'inactive'}`}>
                            {item.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="text-dim text-sm">
                          {new Date(item.created_at).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="flex items-center gap-sm">
                            <Button variant="ghost" size="sm" onClick={() => openEdit(item)}>
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )
        )}
      </div>

      {/* Create / Edit dialog */}
      {dialog && (
        <div
          className="dialog-overlay"
          onClick={e => e.target === e.currentTarget && closeDialog()}
        >
          <div className="dialog" role="dialog" aria-modal="true">
            <div className="dialog__header">
              <span className="dialog__title">
                {dialog.mode === 'create' ? 'New Item' : 'Edit Item'}
              </span>
              <button className="dialog__close" onClick={closeDialog} aria-label="Close">×</button>
            </div>

            <div className="dialog__body">
              <Input
                label="Title"
                value={form.title}
                onChange={setField('title')}
                error={formErrors.title}
                placeholder="Enter a title"
                autoFocus
              />
              <Input
                label="Description"
                as="textarea"
                value={form.description}
                onChange={setField('description')}
                placeholder="Optional description"
                hint="Supports plain text"
              />
            </div>

            <div className="dialog__footer">
              <Button variant="ghost" onClick={closeDialog}>Cancel</Button>
              <Button variant="primary" loading={isSaving} onClick={handleSubmit}>
                {dialog.mode === 'create' ? 'Create' : 'Save changes'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
