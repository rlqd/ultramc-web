
const translationsRu: Record<string,string> = {
    // Error
    'Error: {message}': 'Ошибка: {message}',
    // Error messages
    'Enter both Username and Password': 'Заполните поля Логин и Пароль',
    'User not found': 'Пользователь не найден',
    'Password does not match': 'Пароль не совпадает',
    'Unknown error': 'Неизвестная ошибка',
    'Please fill all fields': 'Заполните все поля',
    'New passwords does not match': 'Новые пароли не совпадают',
    'New password is too easy (min. 8 characters)': 'Новый пароль слишком простой (мин. 8 символов)',
    // Login
    'Welcome': 'Добро пожаловать',
    'Username': 'Логин',
    'Password': 'Пароль',
    'Login': 'Войти',
    // Profile
    'Account': 'Аккаунт',
    'Skin': 'Скин',
    'Hello, {name}!': 'Привет, {name}!',
    'Error logging out': 'Ошибка при выходе',
    'Change license': 'Сменить лицензию',
    'Link license': 'Привязать лицензию',
    'Change password': 'Сменить пароль',
    'Logout': 'Выйти',
    // Password
    'Your password was reset!': 'Ваш пароль был сброшен!',
    'It is required to set a new password.': 'Необходимо установить новый пароль.',
    'Old password': 'Старый пароль',
    'New password': 'Новый пароль',
    'New again': 'Новый еще раз',
    'Back': 'Назад',
    // Mojang
    'Enter nickname of your license Minecraft account. This account will be able to join Ultra servers using any launcher.': 'Введите никнейм лицензионного аккаунта. Этот аккаунт сможет заходить на сервера Ultra из стороннего лаунчера.',
    'Nickname': 'Никнейм',
    'Link account': 'Привязать аккаунт',
    // FooterDownload
    'Launcher': 'Лаунчер',
    'Creator tools': 'Конструктор модпаков',
    // SkinPreview
    'Idle': 'Стоит',
    'Walk': 'Идет',
    'Run': 'Бежит',
    'Fly': 'Летит',
    'Pause': 'Пауза',
};
const selectedTranslations = navigator.languages.find(lang => lang == 'ru' || lang.startsWith('ru-')) ? translationsRu : {};

export default function loc(strings: TemplateStringsArray, ... expr: Record<string,string>[]) {
    let source = '';
    const replacements: Record<string,string> = {};
    strings.forEach((string, i) => {
        source += string;
        if (expr[i]) {
            const key = Object.keys(expr[i])[0];
            replacements[key] = expr[i][key];
            source += '{' + key + '}';
        }
    });
    const translation = selectedTranslations[source] ?? source;
    return translation.replace(/{(\w+)}/g, (match: string, key: string) => {
        return replacements[key] ?? match;
    });
}
