document.addEventListener("DOMContentLoaded", () => {
 
    const notesElement = document.getElementById("note-element");
    const noteInput = document.getElementById("note");
    const addNote = document.getElementById("add-note");
    
     addNote.addEventListener("click", () => {
        const single_note = noteInput.value.trim();
        
        if (single_note) {
            const notes = JSON.parse(localStorage.getItem("notes")) || [];
            notes.push(single_note);
            localStorage.setItem("notes", JSON.stringify(notes));
            noteInput.value = "";
            loadNotes();
        }
    });


  window.deleteNote = (index) => {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        loadNotes();
    };


    
    const loadNotes = () => {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        notesElement.innerHTML = "";
        notes.forEach((note, index) => {
            const li = document.createElement("li");
            li.dataset.index = index;
            li.innerHTML = `
                <span>${note}</span>
                <button class="delete-btn" onclick="deleteNote(${index})">elimina</button>
            `;
            notesElement.appendChild(li);
            addSwipeHandler (li, index)

        });
    };

    const addSwipeHandler = (element, index) => {  

        let startX, moved = false;
        const startDrag = (e) => {
            startX = e.clientX || e.touches [0]. clientX;
            moved = false;
        };
        const moveDrag = (e) => {
            let moveX = e.clientX || e.touches[0].clientX;
            let diff = startX - moveX;
            if (diff > 50) {
                moved = true;
                element.style.transition = "transform 1.0s ease";
                element.style.transform = "translateX(-100%)";
            }
        };
        
        const endDrag = () => {
            if (moved) {
                setTimeout(() => {
                    deleteNote(parseInt(element.dataset.index));
                }, 400);
            } else {
                element.style.transform = "translateX(0)";
            }
        };
        
        element.addEventListener("mousedown", startDrag);
        element.addEventListener("mousemove", moveDrag);
        element.addEventListener("mouseup", endDrag);
        element.addEventListener("mouseleave", endDrag);
        
        element.addEventListener("touchstart", startDrag);
        element.addEventListener("touchmove", moveDrag);
        element.addEventListener("touchend", endDrag);
    };
    

    
     loadNotes();

});

