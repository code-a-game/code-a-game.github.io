// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

document.querySelectorAll('.content-img').forEach(item => {
  item.addEventListener('click', event => {
    modal.style.display = "block";
    modalImg.src = item.src;
    captionText.innerHTML = item.alt;
  });
});


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0]; 

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

modal.onclick = function(event) {
    // Close the modal if the user clicks on the background or the image
    if (event.target == modal || event.target == modalImg) {
        modal.style.display = "none";
    }
}
