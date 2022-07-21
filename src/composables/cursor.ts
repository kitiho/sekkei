export type CursorLook = 'default' | 'hamburger' | 'drag'
export const useCustomCursor = () => {
  const state = reactive({
    type: 'default' as CursorLook,
  })
  const setType = (payload: CursorLook) => {
    state.type = payload
  }
  return {
    state,
    setType,
  }
}
