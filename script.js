document.addEventListener('DOMContentLoaded', function () {
    const courses = [
      {
        id: 1,
        title: 'HTML',
        description: 'Learn the fundamentals of HTML for web development.',
        thumbnail: 'html-logo.jpg',
      },
      {
        id: 2,
        title: 'CSS',
        description: 'Explore the styling language used in web development.',
        thumbnail: 'css-logo.png',
      },
      {
        id: 3,
        title: 'JavaScript',
        description: 'Dive into the scripting language for dynamic web content.',
        thumbnail: 'js-logo.png',
      },
      {
        id: 4,
        title: 'Bootstrap',
        description: 'Master the front-end framework for responsive web design.',
        thumbnail: 'bootstrap-logo.png',
      },
      {
        id: 5,
        title: 'React',
        description: 'Build interactive user interfaces with the React library.',
        thumbnail: 'React-logo.jpg',
      },
      {
        id: 6,
        title: 'Python',
        description: 'Learn a versatile programming language for various applications.',
        thumbnail: 'python-logo.jpg',
      },
    ];
  
    const courseListElement = document.getElementById('courseList');
  
    courses.forEach(course => {
      const cardHtml = `
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="card">
            <img src="${course.thumbnail}" class="card-img-top" alt="${course.title}">
            <div class="card-body">
              <h5 class="card-title">${course.title}</h5>
              <p class="card-text">${course.description}</p>
              <a href="#" class="btn btn-primary">Enroll Now</a>
            </div>
          </div>
        </div>
      `;
      courseListElement.innerHTML += cardHtml;
    });
  });
  