const ErrorObject = require('../Errors/ErrorObject');
const {
  filterObjectByKeys,
  filterForMongoQuery,
  getUpdatedFields,
} = require('../utils/helpers');

exports.getAll = async (Model, req, res, next) => {
  try {
    let filter;
    if (Model.collection.collectionName === 'reviews') {
      filter = req.params.articleId
        ? { aboutArticle: req.params.articleId }
        : {};
    }

    if (Model.collection.collectionName === 'articles') {
      const requestQuery = filterObjectByKeys(
        req.query,
        Object.keys(Model.schema.tree)
      );

      filter = filterForMongoQuery(requestQuery);
    }

    const docs = await Model.find(filter);

    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        docs,
      },
    });
  } catch (err) {
    const message = err.message || 'No review found.';
    next(new ErrorObject(message, 404));
  }
};

exports.getOne = async (Model, req, res, next) => {
  try {
    const doc = await Model.findOne({ _id: req.params.id });
    if (!doc) return next(new ErrorObject('No document found', 404));

    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  } catch (err) {
    const message = err.message || 'No document found.';
    next(new ErrorObject(message, 404));
  }
};

exports.createOne = async (Model, req, res, next) => {
  try {
    console.log('user', req.user);
    //nested routes for Review
    if (Model.collection.collectionName === 'reviews') {
      if (!req.body.aboutArticle) req.body.aboutArticle = req.params.articleId;
      if (!req.body.author) req.body.author = req.user._id;
    }

    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        review: doc,
      },
    });
  } catch (err) {
    const message = err.message || 'Something went wrong.';
    next(new ErrorObject(message, 404));
  }
};

exports.updateOne = async (Model, req, res, next) => {
  try {
    //Can not update password or passwordConfirm fields this way
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new ErrorObject('This route is not for password updates.', 400)
      );
    }

    const updates =
      Model.collection.collectionName === 'users'
        ? getUpdatedFields(req.body, 'name', 'email')
        : req.body;

    const doc = await Model.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  } catch (err) {}
};

exports.deactivateOne = async (Model, req, res, next) => {
  try {
    const doc = await Model.findOneAndUpdate(
      { _id: req.params.id },
      { active: false }
    );
    res.status(204).json({
      status: 'succes',
      data: {
        doc,
      },
    });
  } catch (err) {
    const message = err.message || 'No document found.';
    next(new ErrorObject(message, 404));
  }
};

exports.deleteOne = async (Model, req, res, next) => {
  try {
    const doc = await Model.findOneAndDelete({ _id: req.params.id });
    if (!doc) return next(new ErrorObject('No document found', 404));

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    const message = err.message || 'No document found.';
    next(new ErrorObject(message, 404));
  }
};
