import csv

def truncate_csv_file(input_csv_filepath, output_csv_filepath, num_rows=10):
    """
    Truncates a CSV file to a specified number of rows.

    Args:
        input_csv_filepath (str): The file path of the input CSV file.
        output_csv_filepath (str): The file path to save the truncated CSV file.
        num_rows (int, optional): The number of rows to keep in the output file.
                                   Defaults to 10.
    """
    try:
        with open(input_csv_filepath, 'r', newline='', encoding='utf-8') as infile, \
             open(output_csv_filepath, 'w', newline='', encoding='utf-8') as outfile:
            reader = csv.reader(infile)
            writer = csv.writer(outfile)

            row_count = 0
            for row in reader:
                if row_count < num_rows:
                    writer.writerow(row)
                    row_count += 1
                else:
                    break # Stop writing after reaching the desired number of rows

        print(f"Successfully truncated '{input_csv_filepath}' to '{output_csv_filepath}' with {row_count} rows.")

    except FileNotFoundError:
        print(f"Error: Input CSV file '{input_csv_filepath}' not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    input_file = "E:/Code/Hacklytics/Data/November/T_ONTIME_MARKETING.csv"  # Replace with the actual path to your input CSV file
    output_file = "E:/Code/Hacklytics/Data/November/Nov-Truncated.csv" # Replace with the desired path for the output file
    truncate_csv_file(input_file, output_file, num_rows=10)