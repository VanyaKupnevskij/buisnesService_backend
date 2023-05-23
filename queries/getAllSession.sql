BEGIN;

SET @date = ?;

SELECT sessions.id AS id, price, free_place, date, 
    films.name AS film_name, 
    films.ganre AS ganre,
    halls.seats AS seats
    FROM sessions 
        INNER JOIN films ON
            sessions.films_id = films.id
        INNER JOIN halls ON
            sessions.halls_id = halls.id
        WHERE date >= DATE(@date) 
        AND date < DATE(@date) + INTERVAL 1 DAY
        AND halls.cinemas_id = ?;

COMMIT;