const student = require('./student')
const teacher = require('./teacher')

function add(teacherName, students) {
  teacher.add(teacherName);

  students.forEach(function (item, index) {
    console.log(index);
    student.add(item);
  }, this);
}

exports.add = add;