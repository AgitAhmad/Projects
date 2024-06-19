let calculation = localStorage.getItem('calculation') || '';
        
        function displayCalculation() {
            document.querySelector('.js-solution')
                .innerHTML = calculation;
        }

        function updateCalculation(value) {
            calculation += value;
            document.querySelector('.js-solution')
                .innerHTML = calculation;
            localStorage.setItem('calculation', calculation);
        }