const interfaceConst = 'interface'

module.exports = (componentName) => `import clsx from 'clsx';
import cls from './${componentName}.module.scss';

${interfaceConst} ${componentName}Props {
    className?: string;
}

export const ${componentName} = (props: ${componentName}Props) => {
    const { className } = props;

    const ${componentName}Class = clsx(
    cls.${componentName}
    );
    return (
        <div className={${componentName}Class}>
           
        </div>
    );
};`
