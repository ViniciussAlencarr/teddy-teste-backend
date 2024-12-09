import 'module-alias/register';
import { addAliases } from 'module-alias';

addAliases({
  '@libs': `${__dirname}/lib`,
  '@middlewares': `${__dirname}/features/middlewares`,
  '@utils': `${__dirname}/utils`,
  '@features': `${__dirname}/features`
});