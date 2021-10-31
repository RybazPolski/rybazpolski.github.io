var lastSelected
const fillPatena = document.querySelector('.fillPatena');
const fillPalka = document.querySelector('.fillPalka');
const fillKielich = document.querySelector('.fillKielich');
const fillPuryfikaterz = document.querySelector('.fillPuryfikaterz');
const empties = document.querySelectorAll('.empty');

        // Fill listeners
        fillPatena.addEventListener('dragstart', dragStart);
        fillPatena.addEventListener('dragend', dragEnd);

        fillPalka.addEventListener('dragstart', dragStart);
        fillPalka.addEventListener('dragend', dragEnd);

        fillKielich.addEventListener('dragstart', dragStart);
        fillKielich.addEventListener('dragend', dragEnd);

        fillPuryfikaterz.addEventListener('dragstart', dragStart);
        fillPuryfikaterz.addEventListener('dragend', dragEnd);

        // Loop through empty boxes and add listeners
        for (const empty of empties) {
        empty.addEventListener('dragover', dragOver);
        empty.addEventListener('dragenter', dragEnter);
        empty.addEventListener('dragleave', dragLeave);
        empty.addEventListener('drop', dragDrop);
        }

        // Drag Functions

        function dragStart() {
        this.className += ' hold';

        switch(this.className){
            case "fillPatena hold":
                lastSelected = "fillPatena"
                break;
            case "fillPalka hold":
                lastSelected = "fillPalka"
                break;
            case "fillKielich hold":
                lastSelected = "fillKielich"
                break;
            case "fillPuryfikaterz hold":
                lastSelected = "fillPuryfikaterz"
                break;
        };

        setTimeout(() => (this.className = 'invisible'), 0);
        
        
    
        }

        function dragEnd() {
        this.className = lastSelected
        }

        function dragOver(e) {
        e.preventDefault();
        }

        function dragEnter(e) {
        e.preventDefault();
        this.className += ' hovered';
        }

        function dragLeave() {
        this.className = 'empty';
        }

        function dragDrop() {
        this.className = 'empty';
        switch(lastSelected){
            case "fillPatena":
                this.append(fillPatena);
                break;
            case "fillPalka":
                this.append(fillPalka);
                break;
            case "fillKielich":
                this.append(fillKielich);
                break;
            case "fillPuryfikaterz":
                this.append(fillPuryfikaterz);
                break;
        }
        }