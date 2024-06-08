import sqlite3

# Step 1: Read the PDF file in binary mode
file_path = 'C:/Users/DELL/Desktop/Melbourne/RMIT/ACA/Sem_1/IT_infa/assigmnets/3/sample/node-js-express -https/book.pdf'
with open(file_path, 'rb') as file:
    pdf_blob = file.read()

# Step 2: Connect to SQLite database and create a table
conn = sqlite3.connect('database.sqlite')
cursor = conn.cursor()

# cursor.execute('''
# CREATE TABLE IF NOT EXISTS pdf_files (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     file_name TEXT,
#     file_data BLOB
# )
# ''')

# conn.commit()

# Step 3: Insert the PDF file into the table as a BLOB
file_name = 'example.pdf'
cursor.execute('''
INSERT INTO books (id, title, author, filePath,createdAt,updatedAt) 
VALUES (?, ?,?,?,?,?)
''', ("3", "pdf_blob","Malith",pdf_blob,'2024-06-05 09:52:11.324 +00:00','2024-06-05 09:52:11.324 +00:00'))

conn.commit()

# Step 4: Retrieve the PDF file from the database (optional)
cursor.execute('''
SELECT filePath FROM books WHERE id = ?
''', ('2',))

pdf_data = cursor.fetchone()[0]

# Save the retrieved PDF file to verify the insertion
with open('retrieved_example.pdf', 'wb') as file:
    file.write(pdf_data)

# Close the database connection
conn.close()
