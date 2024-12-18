// Menghandle Dropdown
function toggleCheckboxes(selectBoxId, checkboxesId) {
  const selectBox = document.getElementById(selectBoxId);
  let expanded = false;

  selectBox.addEventListener("click", () => {
    const checkboxes = document.getElementById(checkboxesId);
    if (!expanded) { //Jika expanded bernilai false
      checkboxes.style.display = "block";
      expanded = true; //checkbox terlihat
    } else { //Jika expanded bernilai true (checkbox terlihat)
      checkboxes.style.display = "none";
      expanded = false; //checkbox tersembunyi
    }
  });
}

//Memanggil fungsi untuk beberapa pasang dropdown-checkbox
toggleCheckboxes("selectBoxYear", "checkboxesYear");
toggleCheckboxes("selectBoxCountry", "checkboxesCountry");
toggleCheckboxes("selectBoxAgeGroup", "checkboxesAgeGroup");
toggleCheckboxes("selectBoxProductCategory", "checkboxesProductCategory");

