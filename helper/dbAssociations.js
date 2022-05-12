const { QuotationModel, ClientModel, UserModel, BrandModel, GroupProductModel, ProductServiceModel, RejectReasonModel, UnitModel, LobModel, ActivityModel, ApproveLeaderModel, BudgetTypeModel, Sequelize: { Op } } = require('../models')

exports.includeClient = {
    model: ClientModel,
    attributes: {
        exclude: ['createdAt', 'updatedAt']
    },
    as: 'client',
    paranoid: false,
}

exports.includePicInternal = {
    model: UserModel,
    attributes: {
        exclude: ['username', 'password', 'createdAt', 'updatedAt']
    },
    as: 'picInternal',
    paranoid: false,
}

const includeBrand = {
    model: BrandModel,
    attributes: {
        exclude: ['createdAt', 'updatedAt']
    },
    as: 'brand',
    paranoid: false,
}
exports.includeBrand = includeBrand

exports.includeGroupProduct = {
    model: GroupProductModel,
    attributes: {
        exclude: ['createdAt', 'updatedAt']
    },
    include: [includeBrand],
    as: 'groupProduct',
    paranoid: false,
}

exports.includeGroupProducts = {
    model: GroupProductModel,
    attributes: {
        exclude: ['createdAt', 'updatedAt']
    },
    as: 'groupProducts',
    paranoid: false,
}

const includeUnit = {
    model: UnitModel,
    as: 'unit',
    attributes: {
        exclude: ['createdAt', 'updatedAt']
    },
    paranoid: false,
}
exports.includeUnit = includeUnit

const includeLOB = {
    model: LobModel,
    as: 'LOB',
    attributes: {
        exclude: ['createdAt', 'updatedAt']
    },
    paranoid: false,
}
exports.includeLOB = includeLOB

const includeIncludeActivity = {
    model: ActivityModel,
    as: 'include',
    attributes: {
        exclude: ['createdAt', 'updatedAt']
    },
}
exports.includeIncludeActivity = includeIncludeActivity

const includeExcludeActivity = {
    model: ActivityModel,
    as: 'exclude',
    attributes: {
        exclude: ['createdAt', 'updatedAt']
    },
}
exports.includeExcludeActivity = includeExcludeActivity

exports.includeProductService = {
    model: ProductServiceModel,
    attributes: {
        exclude: ['createdAt', 'updatedAt']
    },
    include: [includeUnit, includeLOB, includeIncludeActivity, includeExcludeActivity],
    as: 'productService'
}

exports.includeRejectReason = {
    model: RejectReasonModel,
    attributes: {
        exclude: ['createdAt', 'updatedAt']
    },
    as: 'rejectReason',
    paranoid: false,
}

const includeLeader = {
    model: UserModel,
    attributes: {
        exclude: ['username', 'password', 'createdAt', 'updatedAt']
    },
    as: 'leader',
    paranoid: false,
}

exports.includeApproveLeader = {
    model: ApproveLeaderModel,
    order: ['approvedDate', 'ASC'],
    include: [includeLeader],
    as: 'approveLeader',
    paranoid: false,
}

exports.includeProductServices = {
    model: ProductServiceModel,
    as: 'productServices',
    attributes: ['id', 'name', 'lobId']
}

exports.includeBudgetType = {
    model: BudgetTypeModel,
    as: 'budgetType',
    attributes: ['id', 'name']
}