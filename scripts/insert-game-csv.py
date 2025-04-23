import pandas as pd

file_path = '../csv-files/boardgames/bg_info.csv'
chunk_size = 10000

def createSqlStart():
    return "INSERT INTO games (title, year, max_players, min_players, min_time, max_time, type) \n VALUES "

def createDataRow(title, year, max_players, min_players, min_time, max_time, type):
    return f"('{title}', {year}, {max_players}, {min_players}, {min_time},{max_time},'{type}')"

def escapeQuotes(value):
    if isinstance(value, str):
        return value.replace("'", "''")
    else:
        return value

def handleNan(value):
    try:
        if value != value:
            return "NULL"
    except TypeError:
        pass
    return value

i = 1
for chunk in pd.read_csv(file_path, chunksize=chunk_size):
    rows = []
    for index, row in chunk.iterrows():
        title = escapeQuotes(row["Title"])
        type = escapeQuotes(row["Type 1"])
        year = handleNan(row["Year"])
        max_players = handleNan(row["Max players"])
        min_players = handleNan(row["Min players"])
        min_time = handleNan(row["Min time"])
        max_time = handleNan(row["Max time"])
        rows.append(createDataRow(title, year, max_players, min_players, min_time, max_time, type))

    sql = createSqlStart() + ", \n".join(rows)
    f = open(f'sql/{i}.sql', 'w')
    f.write(sql)
    i += 1



