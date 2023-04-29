create database seminar;
use seminar;

select * from students;
truncate table students;

select * from guides;
truncate table guides;

select * from coordinators;
truncate table  coordinators;

select * from selected_pairs;
truncate table  selected_pairs;
drop table selected_pairs;

select * from review1s;
drop table review1s;
truncate table review1s;

select * from ppts;
drop table ppts;
truncate table ppts;

select * from ppt3s;
truncate table ppt3s;

select * from review1_results;
truncate table review1_results;

select * from review2_results;
drop table review2_results;
truncate table review2_results;

select * from review3_results;
truncate table review3_results;


DELIMITER //

-- Create a trigger that updates the "selected_pairs" table whenever a new pair is selected
CREATE TRIGGER update_selected_pairs
AFTER INSERT ON selected_pairs
FOR EACH ROW
BEGIN
  UPDATE selected_pairs SET is_selected = 1 WHERE student_id = NEW.student_id AND guide_id = NEW.guide_id;
END//

-- Create a procedure that calculates the average score of a given student's reviews
CREATE PROCEDURE calculate_average_review_score (IN student_id INT, OUT average_score DECIMAL(5,2))
BEGIN
  SELECT AVG(score) INTO average_score FROM review1s WHERE student_id = student_id;
END//

DELIMITER ;














