BEGIN;

SET @id = ?;
SET @halls_id = ?;
SET @films_id = ?;
SET @date = ?;
SET @price = ?;
SET @free_place = ?;

INSERT INTO sessions (id, halls_id, films_id, date, price, free_place) 
            VALUES (@id, @halls_id, @films_id, @date, @price, @free_place);

COMMIT;