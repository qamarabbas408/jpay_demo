const initial = false;

function toggleMenu(state = initial, action) {
  if (action.type === NAVTOGGLE) {
    return !state;
  }
  return state;
}

export { toggleMenu };
