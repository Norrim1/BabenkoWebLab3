$(function () {
    let index = 0;
    const cards = $('.skill-card');

    $('.burger').on('click', function () {
      $('.nav').slideToggle();
    });
  
    $('#openModal').on('click', () => $('#modal').addClass('modal--active'));
  
    $('.modal__close, .modal').on('click', function(e) {
        if (e.target === this) $('#modal').removeClass('modal--active');
      });

    $('#feedbackForm').on('submit', function(e) {
        e.preventDefault();

        const submitBtn = $(this).find('button[type="submit"]');
        submitBtn.prop('disabled', true).text('В процессе');
      
        setTimeout(() => {
            alert('Отправлено');
            $(this)[0].reset();
            $('#modal').removeClass('modal--active');
            submitBtn.prop('disabled', false).text('Отправить');
        }, 800);
    });

    $.getJSON('data/portfolio.json', function (data) {
        const container = $('#portfolioContainer');
      
        $.each(data, function (_, item) {
          container.append(`
            <div class="portfolio-card">
                <img class="portfolio-card__img" src="${item.image}">
                <h3 class="portfolio-card__title">${item.title}</h3>
                <p class="portfolio-card__desc">${item.description}</p>
            </div>
            `);
        });
    });
    
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 600);
    });
    
    $('.section').hide().fadeIn(1000);

    function showSkill(i) {
    cards.hide().eq(i).fadeIn();
    }

    showSkill(index);

    setInterval(() => {
    index = (index + 1) % cards.length;
    showSkill(index);
    }, 3000);

    $('#toTop').click(() => {
        $('html, body').animate({ scrollTop: 0 }, 600);
    });
});