import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

// Init select
const selects = document.querySelectorAll("select");
M.FormSelect.init(selects);

export function getSelectInstance(elem) {
  return M.FormSelect.getInstance(elem);
}

// Init Autocomplete
const allAutocomplete = document.querySelectorAll(".autocomplete");
M.Autocomplete.init(allAutocomplete);

export function getAutocompleteInstance(elem) {
  return M.Autocomplete.getInstance(elem);
}

// Init Datepicker
const datepickers = document.querySelectorAll(".datepicker");
M.Datepicker.init(datepickers);

export function getDatePickerInstance(elem) {
  return M.Datepicker.getInstance(elem);
}
