/* ===== Трек "Kotlin с нуля до профи" ===== */
const KOTLIN_LEVELS = [
{
  id: "k1",
  title: "Переменные и вывод",
  goal: "Научишься выводить текст и хранить данные",
  icon: "🐣",
  color: "#58cc02",
  theory: [
    { h: "Первая программа", p: "Функция main — точка входа. Всё, что внутри неё, выполняется при запуске. println выводит текст на экран.", code: 'fun main() {\n    println("Привет, Android!")\n}' },
    { h: "val и var", p: "val — значение менять НЕЛЬЗЯ (константа). var — можно. По умолчанию всегда выбирай val.", code: 'val name = "Алекс"   // менять нельзя\nvar age = 12        // можно\nage = 13            // ок!' },
    { h: "Типы данных", p: "Int — целые числа, Double — дробные, String — текст, Boolean — true/false. Тип Kotlin обычно угадывает сам.", code: 'val count: Int = 5\nval price = 99.9      // Double\nval city = "Казань"   // String\nval online = true     // Boolean' },
    { h: "Шаблоны в строках", p: "Знак $ вставляет значение переменной прямо в текст. Для выражений используй ${...}.", code: 'val name = "Алекс"\nprintln("Привет, $name!")\nprintln("Через год: ${age + 1}")' },
    { h: "Комментарии", p: "Комментарии компьютер игнорирует — это заметки для людей. Однострочные начинаются с //.", code: '// это комментарий\nprintln("Код") // а это пояснение' }
  ],
  cards: [
    { t: "println()", d: "Команда вывода текста на экран. Каждая новая — с новой строки.", e: 'println("Привет!")', tip: "print() — то же самое, но без перехода на новую строку." },
    { t: "val", d: "Переменная-константа: присвоил один раз — менять нельзя.", e: 'val city = "Москва"', tip: "val — от value (значение). Используй его по умолчанию." },
    { t: "var", d: "Обычная переменная: значение можно менять сколько угодно.", e: "var score = 0\nscore = 100", tip: "var — от variable (изменяемая)." },
    { t: "String", d: "Тип «текст». Строки всегда пишут в двойных кавычках.", e: 'val hello: String = "Привет"', tip: "Текст + число склеиваются: \"Мне \" + 12 = «Мне 12»." },
    { t: "Boolean", d: "Тип «да/нет»: бывает только true (правда) или false (ложь).", e: "val online: Boolean = true", tip: "Нужен для условий: если online — показать зелёную точку." }
  ],
  quiz: [
    { t: "choice", q: "Что выведет программа?", code: 'fun main() {\n    println("Привет!")\n}', options: ["Привет!", "main", "println", "Ничего"], answer: 0, explain: "println выводит текст в кавычках." },
    { t: "fill", q: "Создай константу с именем:", code: '___ name = "Алекс"', options: ["val", "var", "let", "const"], answer: 0, explain: "val — значение менять нельзя." },
    { t: "choice", q: "Какой код изменит значение?", code: "var age = 12", options: ["age = 13", "val age = 13", "age == 13", "set age 13"], answer: 0, explain: "var можно переназначать через =." },
    { t: "tf", q: "Тип Double хранит дробные числа.", answer: true, explain: "Да: 99.9 — это Double." },
    { t: "choice", q: "Что выведет программа?", code: 'val name = "Кот"\nprintln("Привет, $name!")', options: ["Привет, Кот!", "Привет, $name!", "Привет, name!", "Ошибку"], answer: 0, explain: "$name подставляет значение переменной." }
  ]
},
{
  id: "k2",
  title: "Условия и циклы",
  goal: "Программа начнёт думать и повторять",
  icon: "🔀",
  color: "#1cb0f6",
  theory: [
    { h: "if / else", p: "Если условие правда — выполняется один блок, иначе — другой. Сравнения: ==, !=, <, >, <=, >=.", code: 'val age = 18\nif (age >= 18) {\n    println("Взрослый")\n} else {\n    println("Ребёнок")\n}' },
    { h: "else if — лесенка", p: "Проверок может быть много: они идут сверху вниз до первого совпадения.", code: 'if (score >= 90) {\n    println("Отлично!")\n} else if (score >= 60) {\n    println("Хорошо")\n} else {\n    println("Попробуй ещё")\n}' },
    { h: "when — выбор", p: "Удобная замена длинной лесенке: сравнивает значение с вариантами. else — «во всех остальных случаях».", code: 'when (day) {\n    1 -> println("Понедельник")\n    6, 7 -> println("Выходной!")\n    else -> println("Будни")\n}' },
    { h: "Цикл for", p: "Повторяет действия. Конструкция 1..5 — диапазон от 1 до 5 включительно.", code: 'for (i in 1..5) {\n    println("Шаг $i")\n}' },
    { h: "Цикл while", p: "Крутится, ПОКА условие правда. Не забудь менять переменную, иначе будет бесконечно!", code: 'var n = 3\nwhile (n > 0) {\n    println(n)\n    n = n - 1\n}' }
  ],
  cards: [
    { t: "if / else", d: "Проверка условия: правда — один блок, ложь — другой.", e: 'if (x > 0) {\n    println("Плюс")\n} else {\n    println("Минус")\n}', tip: "В условии == (равно), а не = (присвоить)!" },
    { t: "when", d: "Выбор из нескольких вариантов по значению.", e: 'when (x) {\n    1 -> println("Один")\n    else -> println("Другое")\n}', tip: "Через запятую можно несколько значений: 6, 7 -> ..." },
    { t: "for (i in ...)", d: "Цикл с известным числом повторов.", e: 'for (i in 1..3) {\n    println(i) // 1, 2, 3\n}', tip: "1..5 включает пятёрку, а 1 until 5 — нет." },
    { t: "while", d: "Цикл «пока»: крутится, пока условие истинно.", e: 'while (n > 0) {\n    n = n - 1\n}', tip: "Следи, чтобы условие когда-нибудь стало ложью!" },
    { t: "== и =", d: "= присваивает значение, == сравнивает два значения.", e: 'val a = 5   // присвоить\nif (a == 5) { // сравнить\n}', tip: "Самая частая ошибка новичка — перепутать их." }
  ],
  quiz: [
    { t: "choice", q: "Что выведет код?", code: 'val x = 7\nif (x > 10) {\n    println("A")\n} else {\n    println("B")\n}', options: ["B", "A", "AB", "Ничего"], answer: 0, explain: "7 не больше 10 — сработает else." },
    { t: "fill", q: "Выбери правильное сравнение:", code: 'if (password ___ "1234") {', options: ["==", "=", "===", "equals?"], answer: 0, explain: "Сравнение — двойное равно." },
    { t: "choice", q: "Что выведет when?", code: 'when (6) {\n    6, 7 -> println("Выходной")\n    else -> println("Будни")\n}', options: ["Выходной", "Будни", "6", "Ошибку"], answer: 0, explain: "6 совпала с вариантом 6, 7." },
    { t: "choice", q: "Сколько раз повторится цикл?", code: 'for (i in 1..4) {\n    println(i)\n}', options: ["4", "3", "5", "Бесконечно"], answer: 0, explain: "1..4 — это 1, 2, 3, 4." },
    { t: "tf", q: "Цикл while может крутиться бесконечно, если условие всегда правда.", answer: true, explain: "Да, поэтому переменную внутри меняют." }
  ]
},
{
  id: "k3",
  title: "Функции и null",
  goal: "Свои команды и защита от ошибок",
  icon: "🧩",
  color: "#ff9600",
  theory: [
    { h: "Своя функция", p: "fun создаёт команду со своим именем. Вызываешь её по имени — код внутри выполняется.", code: 'fun sayHello() {\n    println("Привет!")\n}\n// вызов:\nsayHello()' },
    { h: "Параметры", p: "Функция может принимать данные. После двоеточия указывают тип.", code: 'fun greet(name: String) {\n    println("Привет, $name!")\n}\ngreet("Алекс")' },
    { h: "return — ответ", p: "Функция может ВОЗВРАЩАТЬ результат. Тип ответа пишут после скобок через двоеточие.", code: 'fun sum(a: Int, b: Int): Int {\n    return a + b\n}\nval x = sum(2, 3) // 5' },
    { h: "null — пустота", d: "", p: "null означает «ничего нет». Обычная переменная null хранить не может — только если тип с вопросом: String?", code: 'var name: String? = null\nname = "Алекс"' },
    { h: "Безопасные вызовы", p: "?. вызывает метод, только если там не null. ?: подставляет запасное значение (элвис).", code: 'println(name?.length)      // длина или null\nprintln(name?.length ?: 0)  // длина или 0' }
  ],
  cards: [
    { t: "fun", d: "Ключевое слово для создания функции.", e: 'fun hello() {\n    println("Hi")\n}', tip: "Вызов — просто имя со скобками: hello()." },
    { t: "Параметры", d: "Данные, которые функция получает при вызове.", e: 'fun square(n: Int): Int {\n    return n * n\n}', tip: "Имя, двоеточие, тип: name: String." },
    { t: "return", d: "Возвращает результат из функции и заканчивает её.", e: 'fun sum(a: Int, b: Int): Int {\n    return a + b\n}', tip: "Тип после скобок говорит, что вернётся." },
    { t: "null и ?", d: "null — отсутствие значения. Тип с ? разрешает хранить null.", e: 'var s: String? = null', tip: "Без вопроса null положить нельзя — защита от ошибок." },
    { t: "?: (элвис)", d: "Если слева null — взять значение справа.", e: 'val len = name?.length ?: 0', tip: "Выглядит как причёска Элвиса, если повернуть голову." }
  ],
  quiz: [
    { t: "fill", q: "Создай функцию greet:", code: '___ greet() {\n    println("Hi")\n}', options: ["fun", "def", "func", "fn"], answer: 0, explain: "Функции в Kotlin начинаются с fun." },
    { t: "choice", q: "Что вернёт sum(2, 3)?", code: 'fun sum(a: Int, b: Int): Int {\n    return a + b\n}', options: ["5", "23", "6", "Ничего"], answer: 0, explain: "2 + 3 = 5." },
    { t: "fill", q: "Укажи тип возвращаемого значения:", code: 'fun double(n: Int)___ {\n    return n * 2\n}', options: [": Int", "-> Int", "= Int", ": int?"], answer: 0, explain: "Тип ответа — через двоеточие." },
    { t: "tf", q: "Переменная типа String может хранить null.", answer: false, explain: "Только String? (с вопросом) разрешает null." },
    { t: "choice", q: "Что выведет код?", code: 'var name: String? = null\nprintln(name?.length ?: 0)', options: ["0", "null", "4", "Ошибку"], answer: 0, explain: "name — null, значит сработает запасное значение 0." }
  ]
},
{
  id: "k4",
  title: "Классы и объекты",
  goal: "Создавать свои типы данных",
  icon: "🏗️",
  color: "#ce82ff",
  theory: [
    { h: "Класс — чертёж", p: "Класс описывает, из чего состоит объект: свойства (данные) и методы (действия).", code: 'class Player {\n    var name = "Герой"\n    var hp = 100\n}' },
    { h: "Объект — постройка", p: "По чертежу создают объекты. У каждого — свои данные.", code: 'val p1 = Player()\np1.name = "Алекс"\nprintln(p1.hp) // 100' },
    { h: "Конструктор", p: "Значения можно передавать сразу при создании — через скобки класса.", code: 'class Player(var name: String, var hp: Int)\n\nval p = Player("Алекс", 100)' },
    { h: "Методы", p: "Метод — функция внутри класса. Она умеет работать со свойствами объекта.", code: 'class Player(var hp: Int) {\n    fun hit(damage: Int) {\n        hp = hp - damage\n    }\n}' },
    { h: "data class", p: "Класс-«коробка для данных»: Kotlin сам добавляет печать, сравнение и копирование.", code: 'data class User(val name: String, val age: Int)\n\nval u = User("Алекс", 20)\nprintln(u) // User(name=Алекс, age=20)' }
  ],
  cards: [
    { t: "class", d: "Чертёж для создания объектов.", e: 'class Cat {\n    var name = "Барсик"\n}', tip: "Имя класса — всегда с большой буквы." },
    { t: "Объект", d: "Конкретный экземпляр, построенный по классу.", e: 'val cat = Cat()\ncat.name = "Мурзик"', tip: "Один класс — много разных объектов." },
    { t: "Свойства", d: "Переменные внутри класса — данные объекта.", e: 'class Dog {\n    var weight = 10\n}', tip: "Доступ через точку: dog.weight." },
    { t: "Методы", d: "Функции внутри класса — действия объекта.", e: 'class Dog {\n    fun bark() {\n        println("Гав!")\n    }\n}', tip: "Вызов тоже через точку: dog.bark()." },
    { t: "data class", d: "Класс для хранения данных с готовыми удобными функциями.", e: 'data class Point(val x: Int, val y: Int)', tip: "Идеален для ответа сервера, пользователя, товара." }
  ],
  quiz: [
    { t: "fill", q: "Создай класс Cat:", code: '___ Cat {\n    var name = "Барсик"\n}', options: ["class", "object", "fun", "data"], answer: 0, explain: "Классы начинаются со слова class." },
    { t: "choice", q: "Как создать объект?", code: 'class Cat {\n    var name = "Барсик"\n}', options: ["val cat = Cat()", "Cat.create()", "new Cat", "cat = new()"], answer: 0, explain: "Имя класса со скобками: Cat()." },
    { t: "fill", q: "Как прочитать свойство?", code: 'val cat = Cat()\nprintln(___)', options: ["cat.name", "Cat.name", "name.cat", "cat->name"], answer: 0, explain: "Объект, точка, свойство." },
    { t: "tf", q: "Метод — это функция внутри класса.", answer: true, explain: "Да, методы описывают действия объекта." },
    { t: "choice", q: "Зачем нужен data class?", options: ["Удобно хранить данные", "Рисовать кнопки", "Запускать циклы", "Хранить null"], answer: 0, explain: "Готовые печать, сравнение и копирование." }
  ]
},
{
  id: "k5",
  title: "Коллекции и лямбды",
  goal: "Списки, фильтры и короткий код",
  icon: "📚",
  color: "#ff4b4b",
  theory: [
    { h: "Список listOf", p: "Список хранит много значений сразу. Нумерация — с НУЛЯ!", code: 'val fruits = listOf("яблоко", "банан")\nprintln(fruits[0])    // яблоко\nprintln(fruits.size)  // 2' },
    { h: "Изменяемый список", p: "Обычный список менять нельзя. Для добавления нужен mutableListOf.", code: 'val cart = mutableListOf("хлеб")\ncart.add("молоко")\nprintln(cart.size) // 2' },
    { h: "Цикл по списку", p: "for умеет перебирать: на каждом шаге в переменную попадает следующий элемент.", code: 'for (f in fruits) {\n    println(f)\n}' },
    { h: "Лямбды и it", p: "Лямбда — короткая функция в фигурных скобках. it — текущий элемент.", code: 'fruits.forEach {\n    println(it)\n}' },
    { h: "map и filter", p: "Суперсилы списков: map преобразует каждый элемент, filter оставляет нужные.", code: 'val nums = listOf(1, 2, 3, 4)\nval even = nums.filter { it % 2 == 0 }\n// even = [2, 4]' }
  ],
  cards: [
    { t: "listOf", d: "Создаёт неизменяемый список.", e: 'val a = listOf(1, 2, 3)', tip: "Первый элемент — под номером 0!" },
    { t: "mutableListOf", d: "Создаёт список, в который можно добавлять.", e: 'val m = mutableListOf<String>()\nm.add("hi")', tip: "add() — добавить элемент в конец." },
    { t: "[i] и .size", d: "Доступ к элементу по номеру и размер списка.", e: 'fruits[1]    // второй элемент\nfruits.size  // сколько всего', tip: "Последний номер = size - 1." },
    { t: "forEach", d: "Выполнить действие для каждого элемента.", e: 'nums.forEach {\n    println(it * 2)\n}', tip: "it — текущий элемент, магия Kotlin." },
    { t: "filter", d: "Оставить только элементы, прошедшие проверку.", e: 'nums.filter { it > 10 }', tip: "Возвращает НОВЫЙ список, старый не трогает." }
  ],
  quiz: [
    { t: "choice", q: "Что выведет код?", code: 'val a = listOf(10, 20, 30)\nprintln(a[0])', options: ["10", "30", "0", "Ошибку"], answer: 0, explain: "Нумерация с нуля: a[0] — первый." },
    { t: "fill", q: "Узнай размер списка:", code: 'val a = listOf(1, 2, 3)\nprintln(a.___)', options: ["size", "length", "count()", "len"], answer: 0, explain: "У списков размер — .size." },
    { t: "choice", q: "В какой список можно добавить элемент?", options: ["mutableListOf", "listOf", "Оба", "Ни в какой"], answer: 0, explain: "Только mutable-список разрешает add()." },
    { t: "choice", q: "Что такое it в forEach?", options: ["Текущий элемент", "Размер списка", "Номер цикла", "Ошибка"], answer: 0, explain: "it — элемент, который обрабатываем сейчас." },
    { t: "tf", q: "filter изменяет исходный список.", answer: false, explain: "Нет, filter возвращает новый список." }
  ]
},
{
  id: "k6",
  title: "Профи-фишки",
  goal: "Писать как настоящий разработчик",
  icon: "🧙",
  color: "#4b4b4b",
  theory: [
    { h: "Корутины за минуту", p: "Корутины выполняют долгую работу (сеть, база) в фоне и не тормозят экран. Запускаются через launch, пауза — delay.", code: '// в Android:\nlifecycleScope.launch {\n    delay(1000) // подождать секунду\n    textView.text = "Готово!"\n}' },
    { h: "suspend-функции", p: "Функции с долгой работой помечают suspend. Их можно вызывать только из корутин.", code: 'suspend fun loadUser(): User {\n    delay(500)\n    return User("Алекс")\n}' },
    { h: "let и apply", p: "Scope-функции для короткого кода: let работает с it, apply настраивает объект.", code: 'name?.let {\n    println("Привет, $it")\n}' },
    { h: "Extension-функции", p: "Можно «прикрутить» свой метод к чужому классу — даже к String!", code: 'fun String.shout(): String {\n    return this.uppercase() + "!!!"\n}\nprintln("ура".shout()) // УРА!!!' },
    { h: "Ты — профи!", p: "Ты прошёл путь от println до корутин. Дальше — практика: RecyclerView, Retrofit и свой проект в портфолио. Удачи, разработчик!", code: 'val you = Developer("PRO")\nyou.buildAwesomeApps()' }
  ],
  cards: [
    { t: "launch", d: "Запускает корутину — фоновую задачу.", e: 'lifecycleScope.launch {\n    // долгая работа\n}', tip: "Экран при этом не зависает." },
    { t: "suspend", d: "Метка функций с долгой работой.", e: 'suspend fun load(): Data', tip: "Вызывать только из корутин." },
    { t: "let", d: "Выполнить блок с объектом как it.", e: 'user?.let {\n    println(it.name)\n}', tip: "Идеально в паре с ?. — защита от null." },
    { t: "Extension", d: "Свой метод для чужого класса.", e: 'fun Int.double() = this * 2', tip: "this внутри — сам объект." },
    { t: "delay", d: "Пауза в корутине (не тормозит поток!).", e: 'delay(1000) // 1 секунда', tip: "В отличие от Thread.sleep — лёгкая пауза." }
  ],
  quiz: [
    { t: "choice", q: "Зачем нужны корутины?", options: ["Долгая работа без зависания экрана", "Рисование кнопок", "Хранение паролей", "Ускорение печати"], answer: 0, explain: "Сеть и база уходят в фон." },
    { t: "fill", q: "Запусти фоновую задачу:", code: 'lifecycleScope.___ {\n    loadData()\n}', options: ["launch", "start", "run", "go"], answer: 0, explain: "launch запускает корутину." },
    { t: "tf", q: "suspend-функцию можно вызвать откуда угодно.", answer: false, explain: "Только из корутины или другой suspend-функции." },
    { t: "choice", q: "Что делает let?", options: ["Выполняет блок с объектом как it", "Удаляет объект", "Копирует список", "Останавливает цикл"], answer: 0, explain: "Scope-функция для короткого кода." },
    { t: "tf", q: "Extension-функция добавляет метод чужому классу.", answer: true, explain: "Да, даже к String!" }
  ]
}
];

/* ===== Песочница: задания от простого к сложному ===== */
const SANDBOX_TASKS = [
  { id: "s1", title: "Привет, мир!", desc: "Выведи на экран текст: Привет, Android!", hint: "Используй println() и кавычки.", starter: 'fun main() {\n    // твой код здесь\n}', expected: "Привет, Android!" },
  { id: "s2", title: "Визитка", desc: "Создай переменную name со своим именем и выведи: Меня зовут, ... (подставь имя через $).", hint: 'val name = "...", затем println("Меня зовут, $name")', starter: 'fun main() {\n    // создай переменную name\n    // выведи визитку\n}', expected: "Меня зовут, Алекс" },
  { id: "s3", title: "Калькулятор", desc: "Есть два числа: a = 7 и b = 5. Выведи их сумму (должно получиться 12).", hint: "val sum = a + b, затем println(sum)", starter: 'fun main() {\n    val a = 7\n    val b = 5\n    // посчитай сумму и выведи\n}', expected: "12" },
  { id: "s4", title: "Проверка возраста", desc: "Переменная age = 16. Если возраст 18 или больше — выведи «Взрослый», иначе — «Ребёнок».", hint: "if (age >= 18) { ... } else { ... }", starter: 'fun main() {\n    val age = 16\n    // твой if / else здесь\n}', expected: "Ребёнок" },
  { id: "s5", title: "День недели", desc: "Переменная day = 6. Через when выведи «Выходной!», если 6 или 7, иначе — «Будни».", hint: "when (day) { 6, 7 -> ... else -> ... }", starter: 'fun main() {\n    val day = 6\n    // твой when здесь\n}', expected: "Выходной!" },
  { id: "s6", title: "Считалочка", desc: "Циклом for выведи числа от 1 до 5, каждое с новой строки.", hint: "for (i in 1..5) { println(i) }", starter: 'fun main() {\n    // твой цикл здесь\n}', expected: "1\n2\n3\n4\n5" },
  { id: "s7", title: "Функция-удвоитель", desc: "Напиши функцию double(n: Int): Int, которая возвращает n * 2. Вызови её для числа 21 (ответ: 42).", hint: "fun double(n: Int): Int { return n * 2 }", starter: 'fun double(n: Int): Int {\n    // твой код\n}\n\nfun main() {\n    println(double(21))\n}', expected: "42" },
  { id: "s8", title: "Список покупок", desc: "Создай список из трёх покупок: хлеб, молоко, сыр. Циклом выведи каждую с новой строки.", hint: 'listOf("хлеб", "молоко", "сыр") + for', starter: 'fun main() {\n    // создай список\n    // выведи циклом\n}', expected: "хлеб\nмолоко\nсыр" }
];
