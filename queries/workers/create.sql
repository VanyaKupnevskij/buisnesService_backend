BEGIN;

SET @id = ?;
SET @name = ?;
SET @adress = ?;

INSERT INTO cinemas (id, name, adress) 
            VALUES (@id, @name, @adress);
INSERT INTO halls (id, cinemas_id, number, seats) 
            VALUES ?;

COMMIT;