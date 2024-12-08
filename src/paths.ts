import 'module-alias/register';
import { addAliases } from 'module-alias';

addAliases({
  '@libs': `${__dirname}/lib`,
  '@utils': `${__dirname}/utils`,
  '@features': `${__dirname}/features`
});