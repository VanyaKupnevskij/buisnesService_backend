BEGIN;

SET @date = ?;
SET @money_account = ?;
SET @comment = ?;
SET @source_from = ?;

SET @income_price = ?;

SET @costs_workers_id = ?;
SET @costs_price = ?;
SET @costs_already_paid = ?;

UPDATE records 
    SET date = @date, 
        money_account = @money_account, 
        comment = @comment, 
        source_from = @source_from
    WHERE id = ?;

UPDATE income 
    SET price = @income_price
    WHERE records_id = ?;

UPDATE costs 
    SET workers_id = @costs_workers_id,
        price = @costs_price,
        already_paid = @costs_already_paid
    WHERE records_id = ?;

COMMIT;