Project: Digital Reasoning - User Experience/Front-end Developer interview
--------------
This project is designed to take a directory of text and xml files and merge the annotation from the xml into the text file for display on the screen.  In effect, to highlight annotations for the user to CRUD.

**Please see the Resources folder for UI mockup and system topography diagram!**

Currently, this project is only supported in Chrome.


INTERACTION
--------------
**Creating an Annotation**
```
* If a user has selected an active category, they may double-click any word in the document and it will
immediately be annotated with that category. It will also be visually marked
* If a user chooses to highlight text by clicking and dragging, when the mouse is released the text 
will also be hightlighted and annotated with the active category.
* If no active category is selected, eith action above will only result in selected text in the document.
The user will then need to select a category to annotate that text.
```

**Deleting an Annotation**
```
* Hovering over an existing annotation, a category flotating panel will appear. Inside that panel will be 
a label of the Annotation Category and a button to delete the annotation.
* Double-clicking an existing annotation while no category is selected will remove the annotation entirely
* Double-clicking an existing annotation while a category is turned on will change that annotation to the
Active category.
```

**Changing an Annotation**
```
* If a user selects an existing annotation by either double-clicking or clicking and dragging AND there is
 an active category selected, the annotation will change to the active category.  *Note: if no category
is selected, the annotation will be deleted.
```

**Interacting with Categories**
```
* Clicking on an inactive category header make that category active and will highlight each instance of 
that category annotation in the document
* Clicking on an active category will deselect the category header and deselect any highlighted elements
 in the document
* Clicking on a category header will expand the category - in an accordion manner- to reveal a list of 
each annotation inside that category.
* A user may add an annotation category simply by typing the label into the "create new category" input 
box and hitting the 'enter' key.  If unique, the category will be added and made available immediately.
```
