//SetStoryComposer.jsx
//An InDesign JavaScript Script
/*  
//Sets all stories in an InDesign document to use the specified paragraph or single-line composer.
//
*/
main();
function main(){
	//Make certain that user interaction (display of dialogs, etc.) is turned on.
	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
	if(app.documents.length != 0){
		if (app.activeDocument.stories.length != 0){
			myDisplayDialog();
		}
		else{
			alert("The document does not contain any text. Please open a document containing text and try again.");
		}
	}
	else{
		alert("No documents are open. Please open a document and try again.");
	}
}
function myDisplayDialog(){
	with(myDialog = app.dialogs.add({name:"SetStoryComposer"})){
		//Add a dialog column.
		myDialogColumn = dialogColumns.add()	
		with(myDialogColumn){
			with(borderPanels.add()){
				staticTexts.add({staticLabel:"Set all stories' composer to:"});
				with(myComposerButtons = radiobuttonGroups.add()){
					radiobuttonControls.add({staticLabel:"Adobe World Ready Paragraph Composer", checkedState:true});
					radiobuttonControls.add({staticLabel:"Adobe World Ready Single-Line Composer"});
					radiobuttonControls.add({staticLabel:"Adobe Paragraph Composer"});
					radiobuttonControls.add({staticLabel:"Adobe Single-Line Composer"});
				}
			}
		}
		myReturn = myDialog.show();
		if (myReturn == true){
			//Get the values from the dialog box.
			myComposer = myConvertComposerButtons.selectedButton;
			myDialog.destroy;
			if(app.activeDocument.stories.length !=0){
				mySetAllStories(myComposerFormat);
			}
		}
		else{
			myDialog.destroy();
		}
	}
}
//mySetAllStories function takes care of setting the stories to use the selected composer.
//myComposerFormat is a number from 0-3, corresponding to the radio button options created with myDisplagDialog()
//Values for each composer were taken from user mdomiono's answer 
// on the Graphic Design StackExchange: https://graphicdesign.stackexchange.com/questions/137651/how-to-change-paragraph-composer-using-script#137653
function mySetAllStories(myExportFormat, myFolder){
	for(myCounter = 0; myCounter < app.activeDocument.stories.length; myCounter++){
		myStory = app.activeDocument.stories.item(myCounter);
		myID = myStory.id;
		switch(myComposerFormat){
			case 0:
				myComposer = "$ID/HL Composer Optyca"; // World Ready Paragraph Composer
				break;
			case 1:
				myComposer = "$ID/HL Single Optyca"; // World Ready Single-line Composer
				break;
			case 2:
				myComposer = "$ID/HL Composer"; // Adobe Paragraph Composer
				break;
            case 3:
                myComposer = "$ID/HL Single"  // Adobe Single-line Composer
                break;
		}

        myStory.composer = myComposer; // Apply the selected composer to the story

	}
}