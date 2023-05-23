BEGIN;

SELECT halls_id, free_place, price, COUNT(id)
    INTO @halls_id, @free_place, @price, @count_result
    FROM sessions
        WHERE id = ?;

UPDATE sessions 
    SET free_place = @free_place - 1
    WHERE id = ? AND @count_result > 0;

SELECT cinemas_id
    INTO @cinemas_id
    FROM halls
        WHERE id = @halls_id AND @count_result > 0;

INSERT INTO income (id, cinemas_id, date, income_value) 
            SELECT ?, @cinemas_id, CURRENT_TIMESTAMP(), @price
            WHERE @count_result > 0;        

COMMIT;