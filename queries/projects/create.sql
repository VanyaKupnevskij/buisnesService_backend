BEGIN;

SET @id = ?;
SET @owner_id = ?;
SET @name = ?;
SET @category = ?;


INSERT INTO projects ( id,
                    owner_id,
                    name,
                    category) 
            VALUES (@id,
                    @owner_id,
                    @name,
                    @category );


COMMIT;