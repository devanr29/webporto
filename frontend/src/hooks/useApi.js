import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * useApi — for data fetching (GET-style).
 *
 * const { data, loading, error, execute } = useApi(() => itemsApi.getAll())
 *
 * @param {Function} apiFn     - The async function to call
 * @param {Object}   options
 * @param {boolean}  options.immediate  - Fetch on mount (default: true)
 * @param {any}      options.initialData - Initial value for data
 */
export function useApi(apiFn, options = {}) {
  const { immediate = true, initialData = null } = options
  const [data, setData]       = useState(initialData)
  const [loading, setLoading] = useState(immediate)
  const [error, setError]     = useState(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => { mountedRef.current = false }
  }, [])

  const execute = useCallback(async (...args) => {
    setLoading(true)
    setError(null)
    try {
      const result = await apiFn(...args)
      if (mountedRef.current) setData(result)
      return result
    } catch (err) {
      if (mountedRef.current) setError(err.message)
      throw err
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }, [apiFn]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (immediate) execute()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, execute, setData }
}

/**
 * useMutation — for create / update / delete actions.
 *
 * const { mutate, loading, error } = useMutation(itemsApi.create)
 * await mutate({ title: 'Hello' })
 */
export function useMutation(apiFn) {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const mutate = useCallback(async (...args) => {
    setLoading(true)
    setError(null)
    try {
      return await apiFn(...args)
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [apiFn])

  return { mutate, loading, error }
}
