const courses = Array();
const grades = Array();

// Elements
const error_div = document.getElementById('error')
const container = document.querySelector('.container');
const btn_add = document.getElementById('add');
const btn_calculate = document.getElementById('calculate');
const btn_showall = document.getElementById('show-all');

// Add course
btn_add.addEventListener('click', nope => {
  nope.preventDefault();

  const in_marks = Number(document.getElementById('marks').value);
  const in_credit = Number(document.getElementById('credit').value);
  const in_subject = document.getElementById('sub-name').value;
  
  if (in_marks && in_credit) {
    const course = CreateCourse(in_marks, in_credit, in_subject);
    courses.push(course);
    document.getElementById('form').reset();
    
    const success = document.getElementById('success');
    success.style.display = 'block';
    success.style.animation = 'Success 3s';
    
    setTimeout(() => {
      success.style.display = 'none';
    }, 3000);

    add_course(course);
  }
  else show_error();
  
});

// Calculate and display results
btn_calculate.addEventListener('click', chhotadon => {
  chhotadon.preventDefault();

  let gpa = determine_grades();

  if (gpa) {
    const img_calculating = document.getElementById('calculating-img');
    const score_page = document.getElementById('score-page');
    container.innerHTML = '';
    img_calculating.style.display = 'block';
    container.appendChild(img_calculating);
    setTimeout(() => {
      container.innerHTML = '';
      score_page.style.display = 'grid';
      container.appendChild(score_page);
    }, 3300);

    gpa = Math.round((gpa + Number.EPSILON) * 100) / 100;

    document.getElementById('gpa')
      .innerText = `GPA: ${gpa}`;
    
    document.getElementById('grade')
      .innerText = get_grade(gpa);

  }
})

// Show all courses
btn_showall.addEventListener('click', nibbi => {
  nibbi.preventDefault();

  const all_courses = document.getElementById('showall-div');
  all_courses.style.display = 'flex';
  all_courses.style.right = '0';
  
  document.querySelector('#showall-div .btn')
  .addEventListener('click', () => {
    all_courses.style.right = '-100%';
    all_courses.style.display = 'none';
    })

})

// Course factory
function CreateCourse(
_marks, 
_credit_hour, 
_subj_name) {
  return {
    marks: _marks,
    credit_hours: _credit_hour,
    subj_name: _subj_name || `Subject${courses.length+1}`
  };
}

const show_error = error_msg => {
  error_div.style.display = 'block';
  error_div.innerText = error_msg || `Please fill in the required fields!`;
  container.style.filter = 'blur(20px)';
  setTimeout(() => {
    container.style.filter = 'none';
    error_div.style.display = 'none';
  }, 1500);
}

// reminds me of that meme but it eezz what it eeeeezzzz
const determine_grades = () => {
  let total_gpa = 0;
  let total_hours = 0;
  let each_grade = 0;
  
  if (courses.length) {
    courses.forEach(course => {
      if (course.marks >= 84.50) {
        each_grade = {numeric: 4.0, textual: 'A+'};
      } else if (course.marks >= 79.50) {
        each_grade = {numeric: 3.7, textual: 'A'};
      } else if (course.marks >= 74.50) {
        each_grade = {numeric: 3.4, textual: 'B+'};
      } else if (course.marks >= 69.50) {
        each_grade = {numeric: 3.0, textual: 'B'};
      } else if (course.marks >= 64.50) {
        each_grade = {numeric: 2.5, textual: 'B-'};
      } else if (course.marks >= 59.50) {
        each_grade = {numeric: 2.0, textual: 'C+'};
      } else if (course.marks >= 54.50) {
        each_grade = {numeric: 1.5, textual: 'C'};
      } else if (course.marks >= 49.50) {
        each_grade = {numeric: 1.0, textual: 'D'};
      } else {
        each_grade = {numeric: 0.0, textual: 'F'};
      }

      total_gpa += course.credit_hours * each_grade.numeric;
      total_hours += course.credit_hours;
      grades.push(each_grade);

    })

    return total_gpa / total_hours;

  } else show_error(`Add courses to calculate total!`);

}

// not very proud of this but you know
const get_grade = gpa => {
  if (gpa >= 4.0) return 'A⁺';
  if (gpa >= 3.7) return 'A';
  if (gpa >= 3.4) return 'B⁺';
  if (gpa >= 3.0) return 'B';
  if (gpa >= 2.5) return 'B⁻';
  if (gpa >= 2.0) return 'C⁺';
  if (gpa >= 1.5) return 'C';
  if (gpa >= 1.0) return 'D';
  else return 'F';
}

const add_course = course => {
  const course_card = document.querySelector('#showall-div');
  const each = document.createElement('div');
  each.setAttribute('class', 'each');
  each.innerHTML = `<span class="__each marks">
                      <span class="key">Marks ➡ </span>
                      <span class="value">${course.marks}</span>
                    </span>
                    <span class="__each hours">
                      <span class="key">Credit Hours ➡ </span>
                      <span class="value">${course.credit_hours}</span>
                    </span>
                    <span class="__each subject">
                      <span class="key">Subject ➡ </span>
                      <span class="value">${course.subj_name}</span>
                    </span>`

  course_card.appendChild(each);

}
