import requests
import csv

# The OMDb API URL with your query
url = [["https://omdbapi.com/?apikey=d5c7f9ba&t=the%20dark%20knight%20rises"],
       
]

# Send a GET request to the URL and get the JSON response
response = requests.get(url)
data = response.json()

# Specify the CSV file to save the data
csv_filename = 'poster.csv'

# Open the CSV file in write mode
with open(csv_filename, mode='w', newline='', encoding='utf-8') as file:
    writer = csv.DictWriter(file, fieldnames=data.keys())

    # Write the header (fieldnames) to the CSV file
    writer.writeheader()

    # Write the JSON data to the CSV file
    writer.writerow(data)

print(f"Data has been saved to {csv_filename}")
