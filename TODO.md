# TODO

## List Recipients

> As a Sender I want to be able to list recipients in a table

- [x] Frontend: Create app using boilerplate generator <recipientclient>
- [x] Frontend: Create a view <RecipientsList> Which can list all the recipients as a Table 
      - a table component which can be supplemented by the search and select option.
- [x] Backend: Create an express server app which handles the enduser request and serve it.
- [x] Backend: Create API-endpoint `GET /recipients`
      - Establish the connection with the the database.
      - Access the database table and serve the request with the table data as a JSON object.

## Add Recipients

>  As a Sender I want to be able to add a recipient using a form

- [x] Frontend: Create a view <Recipients> through which recipients can be added. 
      - Add a component <AddRecipients> which is a form to input the required fields and save it.
- [x] Backend: Create API-endpoint `POST /recipients`
      - Establish the connection with the the database.
      - Insert the contents of the request body into the table.

>  As a Sender I want to upload CSV-files with recipients

- [x] Frontend: Make a component <AddCSVFileUpload> which has an input to select a file and upload it. 
      - Add the compenent inside the <Recipients> view.
- [x] Backend: Create API-endpoint `POST /recipients/upload`
      - Establish the connection with the the database.
      - Get the file from the request and parse it to make array of json object from the recipeints CsV file.
      - Iterate and insert the contents into the table.

## Select Recipients

>  As a Sender I want to be able to select recipients
- [x] Frontend:  Table component in the <RecipientsList> view has checkboxs provided by the UI library which can track the selected recipients.

## Delete Recipients

>  As a Sender I want to delete selected recipients 
- [x] Frontend:  Add a button in the <RecipientsList> view which on click can delete the selected recipients.
- [x] Backend: Create API-endpoint `DELETE /recipients`
      - Establish the connection with the the database.
      - Iterate through the recipeints in the request body and delete them from the database table.
