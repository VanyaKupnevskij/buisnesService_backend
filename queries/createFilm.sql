BEGIN;

SET @id = ?;
SET @name = ?;
SET @director = ?;
SET @operator = ?;
SET @ganre = ?;
SET @duration = ?;
SET @preview = ?;
SET @budget = ?;

INSERT INTO films ( id,
                    name,
                    director,
                    operator,
                    ganre,
                    duration,
                    preview,
                    budget) 
            VALUES (@id,
                    @name, 
                    @director, 
                    @operator,
                    @ganre,
                    @duration,
                    @preview,
                    @budget );

INSERT INTO actors (id, full_name) 
            VALUES ?;

INSERT INTO roles (id, actors_id, films_id) 
            VALUES ?;

COMMIT;