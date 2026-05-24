using ContactsManager.Application.Common.Errors;
using ContactsManager.Application.Common.Results;

namespace ContactsManager.Application.Extensions;

public static class ResultExtension
{
    public static TResult Match<TValue, TResult>(
        this Result<TValue> result,
        Func<TValue, TResult> onSuccess,
        Func<Error ,TResult> onFailure)
    {
        return result.IsSuccess
                ? onSuccess(result.Value!)
                : onFailure(result.Error!);
    }
}
