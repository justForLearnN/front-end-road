var person = {};
Object.defineProperty(person, 'name', {
    writable: true,
    configurable: true,
    enumerable: true,
    value: 'Nicholas'
})

for(var key in person) {
    console.log(key);
}

delete person.name;
!person.name && (person.name = 'JAKE');
console.log(`after delete: ${person.name}`);


let book = {
    _year: 2004,
    edition: 1
}

Object.defineProperty(book, 'year', {
    get() {
        return this._year
    },
    set(newValue) {
        if (newValue > 2004) {
            this._year = newValue;
            this.edition += newValue - 2004
        }
    }
})

console.log(`year: ${book.year}`);
book.year = 2006;
console.log(`new year: ${book.year}`);
console.log(`new Edit: ${book.edition}`);

let descriptor = Object.getOwnPropertyDescriptor(person, 'name');
console.log(descriptor);

let dog = {};
Object.defineProperties(dog, {
    name: {
        writable: true,
        configurable: true,
        enumerable: true,
        value: 'Tim'
    },
    _age: {
        configurable: true,
        writable: true,
        enumerable: false,
        value: 2
    },
    age: {
        get() {
            return this._age ++
        },
        set(value) {
            this._age = value;
        }
    }
})

dog.age = 20;
