/* ===== Трек "Kotlin": Этап 2 + чекпоинт ===== */
const KOTLIN_LEVELS = [
{
  id: "k1",
  title: "Переменные и вывод",
  goal: "val/var, типы, вывод в консоль",
  icon: "🐣",
  color: "#58cc02",
  theory: [
    { h: "Первая программа", p: "Функция main — точка входа. Всё, что внутри неё, выполняется при запуске. println выводит текст на экран.", code: 'fun main() {\n    println("Привет, Android!")\n}' },
    { h: "Вывод в Android: Log.d", p: "В настоящем приложении вместо println используют Log.d(TAG, ...) — сообщения видно в окне Logcat. В нашей песочнице работает println.", code: 'Log.d("MY_APP", "Кнопка нажата!")\n// в песочнице:\nprintln("Кнопка нажата!")' },
    { h: "val и var", p: "val — значение менять НЕЛЬЗЯ (константа). var — можно. По умолчанию всегда выбирай val.", code: 'val name = "Алекс"   // менять нельзя\nvar age = 12        // можно\nage = 13            // ок!' },
    { h: "Типы данных", p: "Int — целые числа, Double — дробные, String — текст, Boolean — true/false. Тип Kotlin обычно угадывает сам.", code: 'val count: Int = 5\nval price = 99.9      // Double\nval city = "Казань"   // String\nval online = true     // Boolean' },
    { h: "Шаблоны и комментарии", p: "Знак $ вставляет значение в текст, ${...} — выражение. Комментарии // компьютер игнорирует.", code: 'val name = "Алекс"\nprintln("Привет, $name!") // комментарий\nprintln("Через год: ${age + 1}")' }
  ],
  cards: [
    { t: "println()", d: "Команда вывода текста на экран. Каждая новая — с новой строки.", e: 'println("Привет!")', tip: "print() — то же самое, но без перехода на новую строку." },
    { t: "Log.d", d: "Вывод сообщений в Logcat настоящего Android-приложения: метка + текст.", e: 'Log.d("MY_APP", "Hi!")', tip: "В песочнице вместо него — println." },
    { t: "val", d: "Переменная-константа: присвоил один раз — менять нельзя.", e: 'val city = "Москва"', tip: "val — от value (значение). Используй его по умолчанию." },
    { t: "var", d: "Обычная переменная: значение можно менять сколько угодно.", e: "var score = 0\nscore = 100", tip: "var — от variable (изменяемая)." },
    { t: "String", d: "Тип «текст». Строки всегда пишут в двойных кавычках.", e: 'val hello: String = "Привет"', tip: "Текст + число склеиваются: «Мне » + 12." },
    { t: "Boolean", d: "Тип «да/нет»: бывает только true (правда) или false (ложь).", e: "val online: Boolean = true", tip: "Нужен для условий: если online — показать зелёную точку." }
  ],
  quiz: [
    { t: "choice", q: "Что выведет программа?", code: 'fun main() {\n    println("Привет!")\n}', options: ["Привет!", "main", "println", "Ничего"], answer: 0, explain: "println выводит текст в кавычках." },
    { t: "fill", q: "Создай константу с именем:", code: '___ name = "Алекс"', options: ["val", "var", "let", "const"], answer: 0, explain: "val — значение менять нельзя." },
    { t: "choice", q: "Какой код изменит значение?", code: "var age = 12", options: ["age = 13", "val age = 13", "age == 13", "set age 13"], answer: 0, explain: "var можно переназначать через =." },
    { t: "tf", q: "Тип Double хранит дробные числа.", answer: true, explain: "Да: 99.9 — это Double." },
    { t: "choice", q: "Что выведет программа?", code: 'val name = "Кот"\nprintln("Привет, $name!")', options: ["Привет, Кот!", "Привет, $name!", "Привет, name!", "Ошибку"], answer: 0, explain: "$name подставляет значение переменной." },
    { t: "tf", q: "В Android-приложении для логов используют Log.d.", answer: true, explain: "Да, сообщения смотрят в окне Logcat." }
  ]
},
{
  id: "k2",
  title: "Условия",
  goal: "if / else, when — программа принимает решения",
  icon: "🔀",
  color: "#1cb0f6",
  theory: [
    { h: "if / else", p: "Если условие правда — выполняется один блок, иначе — другой. Сравнения: ==, !=, <, >, <=, >=.", code: 'val age = 18\nif (age >= 18) {\n    println("Взрослый")\n} else {\n    println("Ребёнок")\n}' },
    { h: "else if — лесенка", p: "Проверок может быть много: они идут сверху вниз до первого совпадения.", code: 'if (score >= 90) {\n    println("Отлично!")\n} else if (score >= 60) {\n    println("Хорошо")\n} else {\n    println("Попробуй ещё")\n}' },
    { h: "== и =", p: "= присваивает значение, == сравнивает два значения. Не перепутай!", code: 'val a = 5   // присвоить\nif (a == 5) { // сравнить\n    println("Пять!")\n}' },
    { h: "when — выбор", p: "Удобная замена длинной лесенке: сравнивает значение с вариантами. else — «во всех остальных случаях».", code: 'when (day) {\n    1 -> println("Понедельник")\n    6, 7 -> println("Выходной!")\n    else -> println("Будни")\n}' }
  ],
  cards: [
    { t: "if / else", d: "Проверка условия: правда — один блок, ложь — другой.", e: 'if (x > 0) {\n    println("Плюс")\n} else {\n    println("Минус")\n}', tip: "В условии == (равно), а не = (присвоить)!" },
    { t: "else if", d: "Дополнительная проверка в лесенке условий.", e: 'if (a > 0) {\n} else if (a < 0) {\n} else {\n}', tip: "Проверки идут сверху вниз до первой правды." },
    { t: "when", d: "Выбор из нескольких вариантов по значению.", e: 'when (x) {\n    1 -> println("Один")\n    else -> println("Другое")\n}', tip: "Через запятую можно несколько значений: 6, 7 -> ..." },
    { t: "==", d: "Сравнение: правда, если значения равны.", e: 'if (pass == "1234") {\n}', tip: "Для строк тоже работает: сравнивает содержимое." },
    { t: "!=", d: "Сравнение «не равно».", e: 'if (x != 0) {\n    println("Не ноль")\n}', tip: "Восклицательный знак = отрицание." }
  ],
  quiz: [
    { t: "choice", q: "Что выведет код?", code: 'val x = 7\nif (x > 10) {\n    println("A")\n} else {\n    println("B")\n}', options: ["B", "A", "AB", "Ничего"], answer: 0, explain: "7 не больше 10 — сработает else." },
    { t: "fill", q: "Выбери правильное сравнение:", code: 'if (password ___ "1234") {', options: ["==", "=", "===", "equals?"], answer: 0, explain: "Сравнение — двойное равно." },
    { t: "choice", q: "Что выведет when?", code: 'when (6) {\n    6, 7 -> println("Выходной")\n    else -> println("Будни")\n}', options: ["Выходной", "Будни", "6", "Ошибку"], answer: 0, explain: "6 совпала с вариантом 6, 7." },
    { t: "tf", q: "В лесенке else if проверяется, только если if выше — ложь.", answer: true, explain: "Да, проверки идут по порядку." },
    { t: "choice", q: "Что выведет код?", code: 'val n = -3\nif (n != 0) {\n    println("Не ноль")\n}', options: ["Не ноль", "Ничего", "0", "Ошибку"], answer: 0, explain: "-3 действительно не равно нулю." }
  ]
},
{
  id: "k3",
  title: "Циклы",
  goal: "for и while — повторение без копипасты",
  icon: "🔁",
  color: "#ff9600",
  theory: [
    { h: "Цикл for", p: "Повторяет действия заданное число раз. Переменная i на каждом шаге — следующая.", code: 'for (i in 1..5) {\n    println("Шаг $i")\n}' },
    { h: "Диапазоны: .. и until", p: "1..5 — от 1 до 5 ВКЛЮЧИТЕЛЬНО. 1 until 5 — до 5 НЕ включительно (1,2,3,4).", code: 'for (i in 1..3) println(i)     // 1, 2, 3\nfor (i in 1 until 3) println(i) // 1, 2' },
    { h: "Цикл while", p: "Крутится, ПОКА условие правда. Не забудь менять переменную, иначе будет бесконечно!", code: 'var n = 3\nwhile (n > 0) {\n    println(n)\n    n = n - 1\n}' },
    { h: "break и continue", p: "break — срочно выйти из цикла. continue — пропустить шаг и идти дальше.", code: 'for (i in 1..10) {\n    if (i == 3) break // стоп на тройке\n    println(i)        // 1, 2\n}' }
  ],
  cards: [
    { t: "for (i in ...)", d: "Цикл с известным числом повторов.", e: 'for (i in 1..3) {\n    println(i) // 1, 2, 3\n}', tip: "i на каждом шаге — следующее число." },
    { t: "1..5", d: "Диапазон от 1 до 5 включительно.", e: 'for (i in 1..5) {\n} // 1, 2, 3, 4, 5', tip: "Обе границы входят в диапазон." },
    { t: "until", d: "Диапазон БЕЗ последнего числа.", e: 'for (i in 1 until 5) {\n} // 1, 2, 3, 4', tip: "until = «до, не включая»." },
    { t: "while", d: "Цикл «пока»: крутится, пока условие истинно.", e: 'while (n > 0) {\n    n = n - 1\n}', tip: "Следи, чтобы условие когда-нибудь стало ложью!" },
    { t: "break", d: "Немедленный выход из цикла.", e: 'while (true) {\n    if (угадал) break\n}', tip: "continue — пропустить один шаг." }
  ],
  quiz: [
    { t: "choice", q: "Сколько раз повторится цикл?", code: 'for (i in 1..4) {\n    println(i)\n}', options: ["4", "3", "5", "Бесконечно"], answer: 0, explain: "1..4 — это 1, 2, 3, 4." },
    { t: "choice", q: "Что выведет цикл?", code: 'for (i in 1 until 3) {\n    println(i)\n}', options: ["1, 2", "1, 2, 3", "2, 3", "3"], answer: 0, explain: "until не включает последнее число." },
    { t: "tf", q: "Цикл while может крутиться бесконечно, если условие всегда правда.", answer: true, explain: "Да, поэтому переменную внутри меняют." },
    { t: "fill", q: "Выведи числа 1, 2, 3 циклом:", code: "for (i in ___) {\n    println(i)\n}", options: ["1..3", "1..2", "0..3", "3..1"], answer: 0, explain: "1..3 включает тройку." },
    { t: "choice", q: "Что делает break?", options: ["Выходит из цикла", "Ломает телефон", "Ставит паузу", "Повторяет шаг"], answer: 0, explain: "break — аварийный выход из цикла." }
  ]
},
{
  id: "k4",
  title: "Функции",
  goal: "fun, параметры, возврат значения",
  icon: "🧩",
  color: "#ce82ff",
  theory: [
    { h: "Своя функция", p: "fun создаёт команду со своим именем. Вызываешь её по имени — код внутри выполняется.", code: 'fun sayHello() {\n    println("Привет!")\n}\n// вызов:\nsayHello()' },
    { h: "Параметры", p: "Функция может принимать данные. После двоеточия указывают тип.", code: 'fun greet(name: String) {\n    println("Привет, $name!")\n}\ngreet("Алекс")' },
    { h: "return — ответ", p: "Функция может ВОЗВРАЩАТЬ результат. Тип ответа пишут после скобок через двоеточие.", code: 'fun sum(a: Int, b: Int): Int {\n    return a + b\n}\nval x = sum(2, 3) // 5' },
    { h: "Значения по умолчанию", p: "Параметру можно дать значение «на всякий случай» — тогда его можно не передавать.", code: 'fun greet(name: String = "друг") {\n    println("Привет, $name!")\n}\ngreet() // Привет, друг!' }
  ],
  cards: [
    { t: "fun", d: "Ключевое слово для создания функции.", e: 'fun hello() {\n    println("Hi")\n}', tip: "Вызов — просто имя со скобками: hello()." },
    { t: "Параметры", d: "Данные, которые функция получает при вызове.", e: 'fun square(n: Int): Int {\n    return n * n\n}', tip: "Имя, двоеточие, тип: name: String." },
    { t: "return", d: "Возвращает результат из функции и заканчивает её.", e: 'fun sum(a: Int, b: Int): Int {\n    return a + b\n}', tip: "Тип после скобок говорит, что вернётся." },
    { t: "Аргументы", d: "Конкретные значения, которые передаём при вызове.", e: 'sum(2, 3) // 2 и 3 — аргументы', tip: "Параметры — в объявлении, аргументы — в вызове." },
    { t: "= по умолчанию", d: "Значение параметра, если его не передали.", e: 'fun hi(name: String = "друг")', tip: "Вызов hi() сработает без аргументов." }
  ],
  quiz: [
    { t: "fill", q: "Создай функцию greet:", code: '___ greet() {\n    println("Hi")\n}', options: ["fun", "def", "func", "fn"], answer: 0, explain: "Функции в Kotlin начинаются с fun." },
    { t: "choice", q: "Что вернёт sum(2, 3)?", code: 'fun sum(a: Int, b: Int): Int {\n    return a + b\n}', options: ["5", "23", "6", "Ничего"], answer: 0, explain: "2 + 3 = 5." },
    { t: "fill", q: "Укажи тип возвращаемого значения:", code: 'fun double(n: Int)___ {\n    return n * 2\n}', options: [": Int", "-> Int", "= Int", ": int?"], answer: 0, explain: "Тип ответа — через двоеточие." },
    { t: "tf", q: "Параметр со значением по умолчанию можно не передавать.", answer: true, explain: "Да, подставится значение по умолчанию." },
    { t: "choice", q: "Что такое аргументы?", options: ["Значения при вызове функции", "Ошибки компилятора", "Типы переменных", "Комментарии"], answer: 0, explain: "sum(2, 3) — 2 и 3 это аргументы." }
  ]
},
{
  id: "k5",
  title: "Null-безопасность",
  goal: "Фишка Kotlin: ?, ?., ?:",
  icon: "🛡️",
  color: "#ff4b4b",
  theory: [
    { h: "null — пустота", p: "null означает «ничего нет». Обычная переменная null хранить не может — только если тип с вопросом: String?", code: 'var name: String? = null\nname = "Алекс"' },
    { h: "Безопасный вызов ?.", p: "?. вызывает метод, только если там не null. Иначе — просто null, без падения!", code: 'println(name?.length)\n// "Алекс" → 5, null → null' },
    { h: "Элвис ?: ", p: "Если слева null — взять значение справа. Запасной план в одну строку!", code: 'val len = name?.length ?: 0\n// null → 0' },
    { h: "!! — опасно!", p: "Двойной знак говорит: «там точно не null, я уверен». Если ошибся — приложение упадёт!", code: 'name!!.length // работает, но рискованно\n// лучше: name?.length ?: 0', },
    { h: "let для null", p: "Блок let выполнится, только если значение не null. Внутри оно доступно как it.", code: 'name?.let {\n    println("Привет, $it!")\n}' }
  ],
  cards: [
    { t: "null", d: "Отсутствие значения. «Пусто, ничего нет».", e: 'var s: String? = null', tip: "Миллиардная ошибка программистов — Kotlin её победил." },
    { t: "String?", d: "Тип с вопросом разрешает хранить null.", e: 'var s: String? = null // ок\nvar t: String = null  // ОШИБКА', tip: "Без вопроса null положить нельзя." },
    { t: "?.", d: "Безопасный вызов: если null — вернёт null, а не упадёт.", e: 'name?.length', tip: "Главный инструмент против падений." },
    { t: "?: (элвис)", d: "Если слева null — взять значение справа.", e: 'val len = name?.length ?: 0', tip: "Выглядит как причёска Элвиса, если повернуть голову." },
    { t: "!!", d: "«Там точно не null!» — рискованно, лучше не использовать.", e: 'name!!.length', tip: "Увидел !! в коде — насторожись." }
  ],
  quiz: [
    { t: "tf", q: "Переменная типа String может хранить null.", answer: false, explain: "Только String? (с вопросом) разрешает null." },
    { t: "choice", q: "Что выведет код?", code: 'var name: String? = null\nprintln(name?.length ?: 0)', options: ["0", "null", "4", "Ошибку"], answer: 0, explain: "name — null, значит сработает запасное значение 0." },
    { t: "fill", q: "Безопасно узнай длину (может быть null):", code: "val len = name___length", options: ["?.", ".", "?:", "!!"], answer: 0, explain: "?. — безопасный вызов." },
    { t: "tf", q: "Оператор !! полностью безопасен.", answer: false, explain: "Нет! Если там null — приложение упадёт." },
    { t: "choice", q: "Что делает элвис — val x = a ?: b?", options: ["Если a null — взять b", "Складывает a и b", "Сравнивает a и b", "Удаляет a"], answer: 0, explain: "Запасное значение справа." }
  ]
},
{
  id: "k6",
  title: "Коллекции и лямбды",
  goal: "List, Map и короткие функции",
  icon: "📚",
  color: "#4b4b4b",
  theory: [
    { h: "Список listOf", p: "Список хранит много значений сразу. Нумерация — с НУЛЯ!", code: 'val fruits = listOf("яблоко", "банан")\nprintln(fruits[0])    // яблоко\nprintln(fruits.size)  // 2' },
    { h: "Изменяемый список", p: "Обычный список менять нельзя. Для добавления нужен mutableListOf.", code: 'val cart = mutableListOf("хлеб")\ncart.add("молоко")\nprintln(cart.size) // 2' },
    { h: "Словарь Map", p: "Хранит пары «ключ — значение»: например, имя — возраст. Значение достают по ключу.", code: 'val ages = mapOf("Алекс" to 20, "Кот" to 3)\nprintln(ages["Алекс"]) // 20' },
    { h: "Лямбды и it", p: "Лямбда — короткая функция в фигурных скобках. it — текущий элемент. Именно так пишут обработчики кнопок!", code: 'button.setOnClickListener {\n    println("Нажата!") // лямбда!\n}' },
    { h: "forEach и filter", p: "Суперсилы списков: forEach выполняет действие для каждого, filter оставляет нужные.", code: 'val nums = listOf(1, 2, 3, 4)\nnums.forEach { println(it) }\nval even = nums.filter { it % 2 == 0 }\n// even = [2, 4]' }
  ],
  cards: [
    { t: "listOf", d: "Создаёт неизменяемый список.", e: 'val a = listOf(1, 2, 3)', tip: "Первый элемент — под номером 0!" },
    { t: "mutableListOf", d: "Создаёт список, в который можно добавлять.", e: 'val m = mutableListOf<String>()\nm.add("hi")', tip: "add() — добавить элемент в конец." },
    { t: "Map", d: "Словарь пар «ключ — значение».", e: 'val m = mapOf("a" to 1)\nprintln(m["a"]) // 1', tip: "to связывает ключ и значение." },
    { t: "[i] и .size", d: "Доступ к элементу по номеру и размер списка.", e: 'fruits[1]    // второй элемент\nfruits.size  // сколько всего', tip: "Последний номер = size - 1." },
    { t: "Лямбда { it }", d: "Короткая функция в скобках. it — текущий элемент.", e: 'nums.forEach {\n    println(it * 2)\n}', tip: "Кнопки в Android — тоже лямбды!" },
    { t: "filter", d: "Оставить только элементы, прошедшие проверку.", e: 'nums.filter { it > 10 }', tip: "Возвращает НОВЫЙ список, старый не трогает." }
  ],
  quiz: [
    { t: "choice", q: "Что выведет код?", code: 'val a = listOf(10, 20, 30)\nprintln(a[0])', options: ["10", "30", "0", "Ошибку"], answer: 0, explain: "Нумерация с нуля: a[0] — первый." },
    { t: "fill", q: "Узнай размер списка:", code: 'val a = listOf(1, 2, 3)\nprintln(a.___)', options: ["size", "length", "count()", "len"], answer: 0, explain: "У списков размер — .size." },
    { t: "choice", q: "В какой список можно добавить элемент?", options: ["mutableListOf", "listOf", "Оба", "Ни в какой"], answer: 0, explain: "Только mutable-список разрешает add()." },
    { t: "choice", q: "Что выведет код?", code: 'val m = mapOf("a" to 1, "b" to 2)\nprintln(m["b"])', options: ["2", "b", "1", "Ошибку"], answer: 0, explain: "По ключу «b» лежит 2." },
    { t: "choice", q: "Что такое it в forEach?", options: ["Текущий элемент", "Размер списка", "Номер цикла", "Ошибка"], answer: 0, explain: "it — элемент, который обрабатываем сейчас." },
    { t: "tf", q: "filter изменяет исходный список.", answer: false, explain: "Нет, filter возвращает новый список." }
  ]
},
{
  id: "k7",
  title: "Классы и объекты",
  goal: "class, data class — свои типы данных",
  icon: "🏗️",
  color: "#1cb0f6",
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
}
];

/* ===== Чекпоинт Kotlin: мини-игра ===== */
const KOTLIN_CHECKPOINT = {
  title: "Угадай число",
  desc: "Финальный чекпоинт: собери логику мини-игры «Угадай число», а потом напиши её в Песочнице!",
  questions: [
    { t: "order", q: "Шаги игры «Угадай число»", items: ["Загадать число secret", "Спрашивать попытки в цикле", "Сравнить попытку с secret", "Если равно — победа!"], explain: "Загадал → спрашиваешь → сравниваешь → победа." },
    { t: "fill", q: "Цикл крутится, пока не угадали:", code: "while (guess ___ secret) {", options: ["!=", "==", "=", "<="], answer: 0, explain: "Пока попытка НЕ равна секрету — продолжаем." },
    { t: "choice", q: "Что делает break в игре?", options: ["Выходит из цикла при победе", "Ломает игру", "Загадывает число", "Печатает правила"], answer: 0, explain: "Угадал — break — победа!" },
    { t: "tf", q: "Загаданное число правильно хранить в val — оно не меняется.", answer: true, explain: "Секрет один на всю игру — val." },
    { t: "fill", q: "Подскажи игроку:", code: 'if (guess > secret) {\n    println("___")\n}', options: ["Бери меньше", "Бери больше", "Угадал!", "Ещё раз"], answer: 0, explain: "Попытка больше секрета — надо меньше." },
    { t: "choice", q: "Какой цикл лучше для игры с неизвестным числом попыток?", options: ["while", "for (i in 1..5)", "when", "if"], answer: 0, explain: "while крутится, пока не угадали." }
  ]
};

/* ===== Песочница: задания от простого к сложному ===== */
const SANDBOX_TASKS = [
  { id: "s1", title: "Привет, мир!", desc: "Выведи на экран текст: Привет, Android!", hint: "Используй println() и кавычки.", starter: 'fun main() {\n    // твой код здесь\n}', expected: "Привет, Android!",
    solution: 'fun main() {\n    println("Привет, Android!")\n}' },
  { id: "s2", title: "Визитка", desc: "Создай переменную name со своим именем и выведи: Меня зовут, ... (подставь имя через $).", hint: 'val name = "...", затем println("Меня зовут, $name")', starter: 'fun main() {\n    // создай переменную name\n    // выведи визитку\n}', expected: "Меня зовут, Алекс",
    solution: 'fun main() {\n    val name = "Алекс"\n    println("Меня зовут, $name")\n}' },
  { id: "s3", title: "Калькулятор", desc: "Есть два числа: a = 7 и b = 5. Выведи их сумму (должно получиться 12).", hint: "val sum = a + b, затем println(sum)", starter: 'fun main() {\n    val a = 7\n    val b = 5\n    // посчитай сумму и выведи\n}', expected: "12",
    solution: 'fun main() {\n    val a = 7\n    val b = 5\n    val sum = a + b\n    println(sum)\n}' },
  { id: "s4", title: "Проверка возраста", desc: "Переменная age = 16. Если возраст 18 или больше — выведи «Взрослый», иначе — «Ребёнок».", hint: "if (age >= 18) { ... } else { ... }", starter: 'fun main() {\n    val age = 16\n    // твой if / else здесь\n}', expected: "Ребёнок",
    solution: 'fun main() {\n    val age = 16\n    if (age >= 18) {\n        println("Взрослый")\n    } else {\n        println("Ребёнок")\n    }\n}' },
  { id: "s5", title: "День недели", desc: "Переменная day = 6. Через when выведи «Выходной!», если 6 или 7, иначе — «Будни».", hint: "when (day) { 6, 7 -> ... else -> ... }", starter: 'fun main() {\n    val day = 6\n    // твой when здесь\n}', expected: "Выходной!",
    solution: 'fun main() {\n    val day = 6\n    when (day) {\n        6, 7 -> println("Выходной!")\n        else -> println("Будни")\n    }\n}' },
  { id: "s6", title: "Считалочка", desc: "Циклом for выведи числа от 1 до 5, каждое с новой строки.", hint: "for (i in 1..5) { println(i) }", starter: 'fun main() {\n    // твой цикл здесь\n}', expected: "1\n2\n3\n4\n5",
    solution: 'fun main() {\n    for (i in 1..5) {\n        println(i)\n    }\n}' },
  { id: "s7", title: "Функция-удвоитель", desc: "Напиши функцию double(n: Int): Int, которая возвращает n * 2. Вызови её для числа 21 (ответ: 42).", hint: "fun double(n: Int): Int { return n * 2 }", starter: 'fun double(n: Int): Int {\n    // твой код\n}\n\nfun main() {\n    println(double(21))\n}', expected: "42",
    solution: 'fun double(n: Int): Int {\n    return n * 2\n}\n\nfun main() {\n    println(double(21))\n}' },
  { id: "s8", title: "Список покупок", desc: "Создай список из трёх покупок: хлеб, молоко, сыр. Циклом выведи каждую с новой строки.", hint: 'listOf("хлеб", "молоко", "сыр") + for', starter: 'fun main() {\n    // создай список\n    // выведи циклом\n}', expected: "хлеб\nмолоко\nсыр",
    solution: 'fun main() {\n    val list = listOf("хлеб", "молоко", "сыр")\n    for (x in list) {\n        println(x)\n    }\n}' },
  { id: "s9", title: "Угадай число 🏁", desc: "Чекпоинт! Компьютер загадал 7, попытки — 3, 5, 7. Циклом while перебирай попытки: пока не равно — выводи «Мимо: ...», потом — «Угадал: 7».", hint: "while (tries[i] != secret) { println(\"Мимо: \" + tries[i]); i = i + 1 }", starter: 'fun main() {\n    val secret = 7\n    val tries = listOf(3, 5, 7)\n    var i = 0\n    // твой while здесь\n    // потом выведи "Угадал: ..."\n}', expected: "Мимо: 3\nМимо: 5\nУгадал: 7",
    solution: 'fun main() {\n    val secret = 7\n    val tries = listOf(3, 5, 7)\n    var i = 0\n    while (tries[i] != secret) {\n        println("Мимо: " + tries[i])\n        i = i + 1\n    }\n    println("Угадал: " + tries[i])\n}' },
  { id: "s10", title: "Таблица умножения", desc: "Циклом for выведи таблицу умножения на 3 от 1 до 5. Каждая строка вида: 3 x 1 = 3", hint: 'println("3 x $i = ${3 * i}")', starter: 'fun main() {\n    // твой цикл здесь\n}', expected: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15",
    solution: 'fun main() {\n    for (i in 1..5) {\n        println("3 x $i = ${3 * i}")\n    }\n}' }
];
